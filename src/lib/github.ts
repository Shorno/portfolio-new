import { site } from "./site";

export type LatestPush = {
  name: string;
  description: string | null;
  url: string;
  pushedAt: string;
  language: string | null;
  isPrivate: boolean;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  language: string | null;
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
