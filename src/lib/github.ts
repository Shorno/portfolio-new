import { resolveRepoDescription } from "./repo-descriptions";
import { excludeRepos, includeContributorRepos, site } from "./site";

export type LatestPush = {
  name: string;
  description: string | null;
  url: string;
  pushedAt: string;
  language: string | null;
  isPrivate: boolean;
};

export type RepoRole = "owner" | "contributor";

export type RepoSummary = {
  name: string;
  /** Full name in `"owner/repo"` form — used as a stable React key. */
  fullName: string;
  /** Login of the owning user/org. Equals `site.github_handle` for owner repos. */
  ownerLogin: string;
  /** Whether the configured user owns this repo or is a collaborator/member. */
  role: RepoRole;
  description: string | null;
  url: string;
  pushedAt: string;
  createdAt: string;
  language: string | null;
  stars: number;
  topics: string[];
  isPrivate: boolean;
  isArchived: boolean;
};

type GitHubRepo = {
  name: string;
  full_name: string;
  owner: { login: string };
  description: string | null;
  html_url: string;
  pushed_at: string;
  created_at: string;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  private: boolean;
  fork: boolean;
  archived: boolean;
};

const GITHUB_API = "https://api.github.com";
const FETCH_TIMEOUT_MS = 12_000;

function getGithubToken(): string | undefined {
  const raw = process.env.GITHUB_TOKEN?.trim();
  return raw || undefined;
}

function githubHeaders(token?: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": `${site.github_handle}-portfolio`,
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function publicOwnerReposUrl(perPage: number): string {
  return `${GITHUB_API}/users/${site.github_handle}/repos?sort=pushed&direction=desc&per_page=${perPage}&type=owner`;
}

function authenticatedReposUrl(perPage: number): string {
  return `${GITHUB_API}/user/repos?affiliation=owner,collaborator,organization_member&visibility=all&sort=pushed&direction=desc&per_page=${perPage}`;
}

function logGithubFailure(label: string, status: number, detail?: string) {
  console.error(
    `[github] ${label} failed (${status})${detail ? `: ${detail}` : ""}`,
  );
}

/**
 * Try one or more GitHub URLs. With a token, the first URL is authenticated;
 * on 401/403 we retry without auth so a bad/expired Coolify secret does not
 * break the public archive (invalid Bearer is worse than no token).
 */
async function fetchGithubRepos(
  urls: string[],
  revalidate: number,
  tags: string[],
): Promise<GitHubRepo[] | null> {
  const token = getGithubToken();

  for (let i = 0; i < urls.length; i++) {
    const useToken = i === 0 ? token : undefined;
    try {
      const res = await fetch(urls[i], {
        next: { revalidate, tags },
        headers: githubHeaders(useToken),
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });

      if (res.ok) {
        return (await res.json()) as GitHubRepo[];
      }

      const body = await res.text().catch(() => "");
      logGithubFailure(urls[i], res.status, body.slice(0, 200));

      if (i < urls.length - 1) continue;
      return null;
    } catch (err) {
      console.error(`[github] ${urls[i]} error:`, err);
    }
  }

  return null;
}

/**
 * Fetch the most recently pushed public repo for the configured user.
 * Cached at the edge for 10 minutes. Fails closed (returns a dev sample in
 * development, null in production) so the hero never blocks or crashes on
 * transient API failures or rate limits.
 *
 * Set GITHUB_TOKEN in the environment to raise the rate limit from
 * 60/hr (unauthenticated) to 5000/hr (authenticated, classic PAT or
 * fine-grained read-only token with public_repo scope).
 */
export async function getLatestPush(): Promise<LatestPush | null> {
  const latestUrl = publicOwnerReposUrl(10);
  const token = getGithubToken();
  const repos = await fetchGithubRepos(
    token ? [latestUrl, latestUrl] : [latestUrl],
    600,
    ["github"],
  );
  if (!repos) return devFallback();

  const first = repos.find((r) => !r.fork && !r.archived);
  if (!first) return devFallback();

  return {
    name: first.name,
    description: resolveRepoDescription(first.full_name, first.description),
    url: first.html_url,
    pushedAt: first.pushed_at,
    language: first.language,
    isPrivate: first.private,
  };
}

/**
 * Fetch every repo the configured user has access to, sorted by most-recently
 * pushed first. With a `GITHUB_TOKEN` present, this includes repos the user
 * is a collaborator on or an organization member of (auto-discovery via the
 * authenticated `/user/repos` endpoint). Without a token, falls back to the
 * public `/users/{handle}/repos` endpoint (owner-only, public repos only).
 *
 * Forks are filtered. Repos in `excludeRepos` are dropped. Contributor and
 * org-owned repos are hidden unless listed in `includeContributorRepos`
 * (see `src/lib/site.ts`). Cached for 1 hour.
 */
function isIncludedInIndex(repo: GitHubRepo): boolean {
  if (repo.fork) return false;
  if (excludeRepos.includes(repo.full_name)) return false;
  if (repo.owner.login === site.github_handle) return true;
  return includeContributorRepos.includes(repo.full_name);
}

export async function getAllRepos(): Promise<RepoSummary[]> {
  const token = getGithubToken();
  const urls = token
    ? [authenticatedReposUrl(100), publicOwnerReposUrl(100)]
    : [publicOwnerReposUrl(100)];

  const repos = await fetchGithubRepos(urls, 3600, [
    "github",
    "github-archive",
  ]);
  if (!repos) return devArchiveFallback();

  return repos
    .filter(isIncludedInIndex)
    .map((r): RepoSummary => ({
      name: r.name,
      fullName: r.full_name,
      ownerLogin: r.owner.login,
      role: r.owner.login === site.github_handle ? "owner" : "contributor",
      description: resolveRepoDescription(r.full_name, r.description),
      url: r.html_url,
      pushedAt: r.pushed_at,
      createdAt: r.created_at,
      language: r.language,
      stars: r.stargazers_count,
      topics: r.topics ?? [],
      isPrivate: r.private,
      isArchived: r.archived,
    }));
}

/**
 * Development-only fallback so the editorial design can be iterated on
 * even when GitHub is rate-limiting. Returns null in production so we
 * never show fake data to a real visitor.
 */
function devFallback(): LatestPush | null {
  if (process.env.NODE_ENV !== "development") return null;
  return {
    name: "bikalpo-project",
    description: "B2B commerce platform (monorepo rewrite)",
    url: `https://github.com/${site.github_handle}/bikalpo-project`,
    pushedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    language: "TypeScript",
    isPrivate: false,
  };
}

function devArchiveFallback(): RepoSummary[] {
  if (process.env.NODE_ENV !== "development") return [];
  const now = Date.now();
  const sample: Array<
    Omit<RepoSummary, "url" | "isPrivate" | "isArchived" | "fullName" | "ownerLogin" | "role">
  > = [
    { name: "portfolio-new", description: "This site. Hand-built editorial portfolio in Next.js 16.", pushedAt: new Date(now - 1000 * 60 * 60).toISOString(), createdAt: new Date(now - 1000 * 60 * 60 * 24 * 7).toISOString(), language: "TypeScript", stars: 0, topics: ["nextjs", "tailwind"] },
    { name: "bikalpo-project", description: "B2B commerce platform — Turborepo rewrite.", pushedAt: new Date(now - 1000 * 60 * 60 * 6).toISOString(), createdAt: new Date(now - 1000 * 60 * 60 * 24 * 30).toISOString(), language: "TypeScript", stars: 0, topics: ["turborepo"] },
    { name: "bright-tutor", description: "Multi-tenant SaaS for a tutoring business.", pushedAt: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(), createdAt: new Date(now - 1000 * 60 * 60 * 24 * 90).toISOString(), language: "TypeScript", stars: 0, topics: ["monorepo", "expo"] },
    { name: "stock-management-frontend", description: "Inventory + POS frontend (Vite + React).", pushedAt: new Date(now - 1000 * 60 * 60 * 24 * 14).toISOString(), createdAt: new Date(now - 1000 * 60 * 60 * 24 * 180).toISOString(), language: "TypeScript", stars: 0, topics: ["vite"] },
    { name: "stock-management-server", description: "Backend for stock-management.", pushedAt: new Date(now - 1000 * 60 * 60 * 24 * 14).toISOString(), createdAt: new Date(now - 1000 * 60 * 60 * 24 * 180).toISOString(), language: "TypeScript", stars: 0, topics: ["api"] },
    { name: "auth-experiments", description: "Better-Auth integration sandboxes.", pushedAt: new Date(now - 1000 * 60 * 60 * 24 * 45).toISOString(), createdAt: new Date(now - 1000 * 60 * 60 * 24 * 180).toISOString(), language: "TypeScript", stars: 1, topics: [] },
    { name: "shorno", description: "Personal scratchpad — older site.", pushedAt: new Date(now - 1000 * 60 * 60 * 24 * 365).toISOString(), createdAt: new Date(now - 1000 * 60 * 60 * 24 * 800).toISOString(), language: "TypeScript", stars: 0, topics: [] },
  ];
  return sample.map((r): RepoSummary => {
    const fullName = `${site.github_handle}/${r.name}`;
    return {
      ...r,
      fullName,
      description: resolveRepoDescription(fullName, r.description),
      ownerLogin: site.github_handle,
      role: "owner",
      url: `https://github.com/${site.github_handle}/${r.name}`,
      isPrivate: false,
      isArchived: false,
    };
  });
}

/**
 * Human-friendly relative time. Intentionally terse for the spec-sheet aesthetic.
 * Examples: "12s ago", "4m ago", "2h ago", "3d ago", "5mo ago", "2y ago".
 */
export function timeAgo(iso: string, now: number = Date.now()): string {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  const y = Math.floor(mo / 12);
  return `${y}y ago`;
}

/**
 * Derive a short status label from the most recent push activity.
 * Falls back to the configured site.status when no data is available.
 */
export function deriveStatus(latest: LatestPush | null): {
  tone: "ok" | "default" | "warn";
  label: string;
} {
  if (!latest) return { tone: "ok", label: "available — Q3" };
  const diffH =
    (Date.now() - new Date(latest.pushedAt).getTime()) / 1000 / 60 / 60;
  if (diffH < 24) return { tone: "ok", label: "shipping — today" };
  if (diffH < 24 * 7) return { tone: "ok", label: "shipping — this week" };
  if (diffH < 24 * 30) return { tone: "default", label: "available — open" };
  return { tone: "warn", label: "available — Q3" };
}
