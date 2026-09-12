/** A case study starts with the author's scope, project status, and links to working software. */
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { ProjectArt } from "@/components/work/project-art";
import type { Project } from "@/lib/projects";

const statusMap: Record<Project["status"], string> = {
  live: "Live in production",
  "partial-live": "Partly live · in development",
  "private-client": "Private project",
  "in-development": "In development",
};

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="pt-8 pb-12 md:pt-12 md:pb-16">
      <Container>
        <nav aria-label="Breadcrumb">
          <Link href="/#work" className="inline-flex min-h-11 items-center gap-2 text-sm text-fg-soft transition-colors hover:text-accent">
            <span aria-hidden>←</span> All projects
          </Link>
        </nav>
        <Grid className="mt-6 items-start gap-y-8">
          <div className="col-span-4 md:col-span-8">
            <h1 className="font-display text-[clamp(2.75rem,7vw,6rem)] text-fg" style={{ viewTransitionName: `work-name-${project.slug}` }}>{project.name}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-soft md:text-lg">{project.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              {project.url ? <Link href={project.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-fg transition-colors hover:bg-fg hover:text-bg">Visit live site <span aria-hidden>↗</span></Link> : null}
              {project.playstore ? <Link href={project.playstore} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-fg underline decoration-line-strong underline-offset-4 hover:text-accent">Google Play <span aria-hidden>↗</span></Link> : null}
              {project.github ? <Link href={project.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-fg underline decoration-line-strong underline-offset-4 hover:text-accent">Source code <span aria-hidden>↗</span></Link> : null}
            </div>
          </div>
          <aside aria-label="Project details" className="col-span-4 md:col-span-4 md:border-l md:border-line md:pl-8">
            <dl className="grid grid-cols-1 gap-5">
              <div><dt className="text-sm text-muted">My contribution</dt><dd className="mt-2 text-base font-medium text-fg">{project.contribution}</dd></div>
              <div><dt className="text-sm text-muted">Period</dt><dd className="mt-2 font-mono text-sm text-fg">{project.year}</dd></div>
              <div><dt className="text-sm text-muted">Status</dt><dd className="mt-2 text-sm text-fg">{statusMap[project.status]}</dd></div>
            </dl>
          </aside>
        </Grid>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3 border-t border-line pt-5">
          <span className="text-sm text-muted">Technology</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs leading-relaxed text-fg-soft">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="mt-8 aspect-video overflow-hidden border border-line bg-bg-elev" style={{ viewTransitionName: `work-art-${project.slug}` }}>
          <ProjectArt project={project} priority />
        </div>
      </Container>
    </section>
  );
}