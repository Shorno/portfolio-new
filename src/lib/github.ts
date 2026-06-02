import { excludeRepos, site } from "./site";

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
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": `${site.github_handle}-portfolio`,
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const url = `https://api.github.com/users/${site.github_handle}/repos?sort=pushed&direction=desc&per_page=10`;
    const res = await fetch(url, {
      next: { revalidate: 600, tags: ["github"] },
      headers,
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) return devFallback();

    const repos = (await res.json()) as GitHubRepo[];
    const first = repos.find((r) => !r.fork && !r.archived);
    if (!first) return devFallback();

    return {
      name: first.name,
      description: first.description,
      url: first.html_url,
      pushedAt: first.pushed_at,
      language: first.language,
      isPrivate: first.private,
    };
  } catch {
    return devFallback();
  }
}

/**
 * Fetch every repo the configured user has access to, sorted by most-recently
 * pushed first. With a `GITHUB_TOKEN` present, this includes repos the user
 * is a collaborator on or an organization member of (auto-discovery via the
 * authenticated `/user/repos` endpoint). Without a token, falls back to the
 * public `/users/{handle}/repos` endpoint (owner-only, public repos only).
 *
 * Forks are filtered. Repos listed in `excludeRepos` (see `src/lib/site.ts`)
 * are also filtered. Cached for 1 hour. Returns a dev fallback set when
 * rate-limited locally.
 */
export async function getAllRepos(): Promise<RepoSummary[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": `${site.github_handle}-portfolio`,
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const url = token
    ? `https://api.github.com/user/repos?affiliation=owner,collaborator,organization_member&visibility=all&sort=pushed&direction=desc&per_page=100`
    : `https://api.github.com/users/${site.github_handle}/repos?sort=pushed&direction=desc&per_page=100&type=owner`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600, tags: ["github", "github-archive"] },
      headers,
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) return devArchiveFallback();

    const repos = (await res.json()) as GitHubRepo[];
    return repos
      .filter((r) => !r.fork)
      .filter((r) => !excludeRepos.includes(r.full_name))
      .map((r): RepoSummary => ({
        name: r.name,
        fullName: r.full_name,
        ownerLogin: r.owner.login,
        role:
          r.owner.login === site.github_handle ? "owner" : "contributor",
        description: r.description,
        url: r.html_url,
        pushedAt: r.pushed_at,
        createdAt: r.created_at,
        language: r.language,
        stars: r.stargazers_count,
        topics: r.topics ?? [],
        isPrivate: r.private,
        isArchived: r.archived,
      }));
  } catch {
    return devArchiveFallback();
  }
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
  return sample.map((r): RepoSummary => ({
    ...r,
    fullName: `${site.github_handle}/${r.name}`,
    ownerLogin: site.github_handle,
    role: "owner",
    url: `https://github.com/${site.github_handle}/${r.name}`,
    isPrivate: false,
    isArchived: false,
  }));
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
