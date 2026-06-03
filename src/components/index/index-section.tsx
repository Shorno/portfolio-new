import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { SectionMark } from "@/components/primitives/section-mark";
import { getAllRepos, timeAgo, type RepoSummary } from "@/lib/github";
import { languageColor } from "@/lib/system";

/**
 * §03 INDEX — every public repo, year-grouped, dense-terminal styling.
 * Server component; fetches at the edge and caches for 1 hour.
 */
export async function IndexSection() {
  const repos = await getAllRepos();
  const grouped = groupByYear(repos);
  const total = repos.length;
  const liveLangs = countLanguages(repos);

  return (
    <section id="index" className="relative py-20 md:py-28">
      <Container>
        <SectionMark index={4} label="INDEX" hint="full archive" />

        {/* Header row */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <h2 className="font-display text-balance text-4xl text-fg md:text-6xl">
              Every repo,
              <br />
              <span className="font-display-italic text-accent">
                in chronological order.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <div className="flex flex-wrap items-baseline justify-end gap-x-8 gap-y-3">
              <Stat label="REPOS" value={total} />
              <Stat label="LANGUAGES" value={Object.keys(liveLangs).length} />
              <Stat label="SYNCED" value={liveLangs._syncedLabel} mono />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-14 md:gap-16">
          {grouped.length === 0 ? <EmptyState /> : null}
          {grouped.map(({ year, items }) => (
            <YearBlock key={year} year={year} items={items} />
          ))}
        </div>

        <p className="mono-label mt-16 text-faint">
          ↓ live from github · cached at the edge for 1 hour
        </p>
      </Container>
    </section>
  );
}

function YearBlock({ year, items }: { year: string; items: RepoSummary[] }) {
  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-line pb-2">
        <span className="font-display text-3xl text-fg md:text-4xl">
          {year}
        </span>
        <span className="mono-label text-faint">
          {items.length} {items.length === 1 ? "repo" : "repos"}
        </span>
      </div>

      <ul className="flex flex-col">
        {items.map((repo, i) => (
          <RepoRow key={repo.fullName} repo={repo} index={i + 1} />
        ))}
      </ul>
    </div>
  );
}

function RepoRow({ repo, index }: { repo: RepoSummary; index: number }) {
  const color = repo.language ? languageColor[repo.language] : undefined;
  return (
    <li>
      <Link
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        className="group/row grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1.5 border-b border-line/50 py-3.5 transition-colors hover:bg-bg-elev/30 md:grid-cols-[2.5rem_minmax(14rem,20rem)_minmax(0,1fr)_auto] md:items-baseline md:gap-x-6 md:gap-y-0"
      >
        <span className="mono-label text-faint">
          {String(index).padStart(2, "0")}
        </span>

        <span className="flex min-w-0 items-baseline gap-2 font-mono text-[13.5px] text-fg group-hover/row:text-accent">
          <span className="min-w-0 truncate">
            {repo.role === "contributor" ? (
              <>
                <span className="text-faint">{repo.ownerLogin}/</span>
                {repo.name}
              </>
            ) : (
              repo.name
            )}
          </span>
          {repo.role === "contributor" ? (
            <span className="mono-label shrink-0 text-accent">co</span>
          ) : null}
          {repo.isArchived ? (
            <span className="mono-label shrink-0 text-faint">[archived]</span>
          ) : null}
          <span
            aria-hidden
            className="ml-auto shrink-0 text-faint transition-transform group-hover/row:translate-x-0.5 md:hidden"
          >
            ↗
          </span>
        </span>

        <span className="col-start-2 min-w-0 text-[12.5px] leading-snug text-fg-soft md:col-start-3 md:truncate md:text-[13px] md:leading-normal">
          {repo.description ?? (
            <span className="text-faint italic">no description</span>
          )}
        </span>

        <span className="col-start-2 flex items-center gap-x-3 gap-y-0 font-mono text-[11px] text-muted md:col-start-4 md:gap-4 md:text-[11.5px]">
          {repo.stars > 0 ? <span>★ {repo.stars}</span> : null}
          {repo.language ? (
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full"
                style={{
                  background: color ?? "currentColor",
                  opacity: color ? 1 : 0.5,
                }}
              />
              {repo.language}
            </span>
          ) : null}
          <span aria-hidden className="text-faint md:hidden">·</span>
          <span className="text-faint md:w-16 md:text-right">
            {timeAgo(repo.pushedAt)}
          </span>
          <span
            aria-hidden
            className="hidden text-faint transition-transform group-hover/row:translate-x-0.5 md:inline"
          >
            ↗
          </span>
        </span>
      </Link>
    </li>
  );
}

function Stat({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string | number;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="mono-label">{label}</span>
      <span
        className={
          mono
            ? "font-mono text-[15px] text-fg"
            : "font-display text-3xl text-fg md:text-4xl"
        }
      >
        {value}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-md border border-line bg-bg-elev/40 p-8 text-center">
      <p className="mono-label mb-2">github · unreachable</p>
      <p className="text-fg-soft">
        Couldn&rsquo;t fetch the live archive right now. Try a refresh, or
        head straight to{" "}
        <a
          href="https://github.com/Shorno?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent"
        >
          github.com/Shorno
        </a>
        .
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────────────────── */

function groupByYear(repos: RepoSummary[]) {
  const map = new Map<string, RepoSummary[]>();
  for (const r of repos) {
    const year = new Date(r.pushedAt).getUTCFullYear().toString();
    const bucket = map.get(year) ?? [];
    bucket.push(r);
    map.set(year, bucket);
  }
  return [...map.entries()]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year, items }));
}

function countLanguages(repos: RepoSummary[]) {
  const counts: Record<string, number> = {};
  let mostRecent = 0;
  for (const r of repos) {
    if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1;
    const ts = new Date(r.pushedAt).getTime();
    if (ts > mostRecent) mostRecent = ts;
  }
  return {
    ...counts,
    _syncedLabel: mostRecent > 0 ? timeAgo(new Date(mostRecent).toISOString()) : "—",
  };
}
