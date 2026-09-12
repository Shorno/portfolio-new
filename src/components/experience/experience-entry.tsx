/** A dated employment record with one summary and direct links to the work. */
import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import { type ExperienceEntry as ExperienceEntryT, formatRange } from "@/lib/experience";

export function ExperienceEntry({ entry }: { entry: ExperienceEntryT }) {
  const linkedProjects = entry.projectSlugs?.map(getProjectBySlug).filter((project) => project !== undefined) ?? [];

  return (
    <article id={`experience-${entry.company.toLowerCase()}`} className="grid scroll-mt-[calc(var(--site-header-h)+1.5rem)] gap-3 py-7 md:grid-cols-12 md:gap-8 md:py-8">
      <div className="md:col-span-3">
        <p className="font-mono text-xs leading-relaxed text-muted">{formatRange(entry.start, entry.end)}</p>
        <p className="mt-2 text-sm capitalize text-fg-soft">{entry.type}</p>
      </div>
      <div className="md:col-span-9">
        <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h3 className="text-xl font-semibold tracking-tight text-fg">
            {entry.companyUrl ? <Link href={entry.companyUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">{entry.company} <span aria-hidden className="text-sm text-muted">↗</span></Link> : entry.company}
          </h3>
          <p className="text-sm text-fg-soft">{entry.role}</p>
        </header>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-fg-soft">{entry.summary}</p>
        {linkedProjects.length > 0 ? (
          <ul aria-label={`Projects at ${entry.company}`} className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
            {linkedProjects.map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent">
                  {project.name} <span aria-hidden className="text-muted">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}