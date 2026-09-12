/** Project records expose contribution and live evidence without scroll choreography. */
import Link from "next/link";
import { ProjectArt } from "./project-art";
import type { Project } from "@/lib/projects";

const statusLabels: Record<Project["status"], string> = {
  live: "Live",
  "partial-live": "Partly live · in development",
  "private-client": "Private project",
  "in-development": "In development",
};

export function WorkCard({ project }: { project: Project }) {
  return (
    <article data-work-card className="grid gap-6 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10">
      <div className="md:col-span-4">
        <div className="relative aspect-video overflow-hidden border border-line bg-bg-elev" style={{ viewTransitionName: `work-art-${project.slug}` }}>
          <ProjectArt project={project} imageFit="cover" sizes="(min-width: 1480px) 450px, (min-width: 768px) 33vw, 100vw" />
        </div>
        <p className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-xs text-muted">
          <span>{project.year}</span>
          <span>{statusLabels[project.status]}</span>
        </p>
      </div>
      <div className="md:col-span-8">
        <h3 className="font-display text-3xl text-fg md:text-4xl" style={{ viewTransitionName: `work-name-${project.slug}` }}>
          {project.name}
        </h3>
        <p className="mt-3 text-sm font-medium text-accent">{project.contribution}</p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-fg-soft">{project.tagline}</p>
        <ul aria-label={`${project.name} main technologies`} className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs leading-relaxed text-muted">
          {project.coreStack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
          <Link href={`/work/${project.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent">Case study <span aria-hidden>→</span></Link>
          {project.url ? <Link href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name} live site`} className="inline-flex min-h-11 items-center gap-2 text-sm text-fg-soft transition-colors hover:text-accent">Live site <span aria-hidden>↗</span></Link> : null}
          {project.playstore ? <Link href={project.playstore} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-fg-soft transition-colors hover:text-accent">Google Play <span aria-hidden>↗</span></Link> : null}
          {project.github ? <Link href={project.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-fg-soft transition-colors hover:text-accent">Source <span aria-hidden>↗</span></Link> : null}
        </div>
      </div>
    </article>
  );
}
