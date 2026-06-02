import Link from "next/link";
import { MonoTag } from "@/components/primitives/mono-meta";
import { getProjectBySlug } from "@/lib/projects";
import {
  type ExperienceEntry as ExperienceEntryT,
  formatDuration,
  formatRange,
} from "@/lib/experience";

/**
 * Single role row in the §02 EXPERIENCE timeline.
 *
 * Two-column on md+ screens — date rail on the left (mono, fixed width),
 * editorial content on the right (serif company, role meta, summary,
 * highlights, stack chips, optional case-study links). Stacks on mobile.
 */
export function ExperienceEntry({
  entry,
}: {
  entry: ExperienceEntryT;
}) {
  const isCurrent = entry.end === "present";
  const range = formatRange(entry.start, entry.end);
  const duration = formatDuration(entry.start, entry.end);

  const linkedProjects =
    entry.projectSlugs
      ?.map((slug) => getProjectBySlug(slug))
      .filter((p): p is NonNullable<ReturnType<typeof getProjectBySlug>> =>
        Boolean(p),
      ) ?? [];

  return (
    <article className="grid grid-cols-1 gap-y-6 py-12 md:grid-cols-12 md:gap-x-8 md:py-16">
      {/* ── Left rail — date range, duration, status tag ────────── */}
      <aside className="md:col-span-3 md:border-r md:border-line md:pr-6">
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-[12px] tracking-tight text-fg-soft">
            {range}
          </span>
          <span className="mono-label text-faint">{duration}</span>
          <MonoTag tone={isCurrent ? "ok" : "default"} className="mt-1">
            {isCurrent ? "current" : "prior"}
          </MonoTag>
        </div>
      </aside>

      {/* ── Right column — company + body ───────────────────────── */}
      <div className="md:col-span-9">
        {/* Company + role header */}
        <header className="flex flex-col gap-3">
          <h3 className="font-display text-balance text-[clamp(2.25rem,5vw,3.75rem)] text-fg">
            {entry.company}
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[12.5px] text-fg-soft">
            <span>{entry.role}</span>
            <span className="text-line">·</span>
            <span className="text-muted">{entry.type}</span>
            {entry.product ? (
              <>
                <span className="text-line">·</span>
                <span>
                  {entry.product}
                  {entry.productNote ? (
                    <span className="text-muted">
                      {" "}
                      ({entry.productNote})
                    </span>
                  ) : null}
                </span>
              </>
            ) : null}
            <span className="text-line">·</span>
            <span className="text-faint">{entry.location}</span>
          </div>
        </header>

        {/* Summary */}
        <p className="mt-7 max-w-2xl text-pretty text-[15.5px] leading-relaxed text-fg-soft md:text-base md:leading-relaxed">
          {entry.summary}
        </p>

        {/* Highlights */}
        <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-3.5 md:grid-cols-2">
          {entry.highlights.map((h) => (
            <li
              key={h}
              className="relative pl-6 text-[14.5px] leading-relaxed text-fg-soft before:absolute before:top-3 before:left-0 before:h-px before:w-3 before:bg-accent"
            >
              {h}
            </li>
          ))}
        </ul>

        {/* Stack chips */}
        <div className="mt-8 flex flex-wrap gap-1.5">
          {entry.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line bg-bg-elev/40 px-2.5 py-1 font-mono text-[11px] tracking-tight text-fg-soft"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Linked case studies (AlgoVerse only, by data shape) */}
        {linkedProjects.length > 0 ? (
          <div className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-2 border-t border-line pt-5">
            <span className="mono-label text-faint">CASE STUDIES →</span>
            {linkedProjects.map((p, i) => (
              <span key={p.slug} className="inline-flex items-baseline gap-2">
                <Link
                  href={`/work/${p.slug}`}
                  className="font-mono text-[12.5px] text-fg underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {p.name}
                </Link>
                {i < linkedProjects.length - 1 ? (
                  <span aria-hidden className="text-line">
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
