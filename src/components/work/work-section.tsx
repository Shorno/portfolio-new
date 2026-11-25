/**
 * Featured projects as split cards, the rest as compact cards.
 * Every project links to the live product by its real address; there are
 * no case-study pages.
 */
import { Arrow } from "@/components/primitives/arrow";
import { BlockHead } from "@/components/primitives/block-head";
import { Container } from "@/components/primitives/container";
import { featuredProjects, otherProjects, statusLabels } from "@/lib/projects";
import { hostname } from "@/lib/utils";
import { ProjectSpread } from "./project-spread";

export function WorkSection() {
  const allFeaturedLive = featuredProjects.every((p) => p.status === "live");

  return (
    <section id="projects" aria-labelledby="projects-title" className="pt-16 md:pt-20">
      <Container>
        <BlockHead
          id="projects-title"
          title="Featured projects"
          intro={`Apps I built for employers and clients.${allFeaturedLive ? " Each link opens the live product." : ""}`}
        />

        {featuredProjects.map((project) => (
          <ProjectSpread key={project.slug} project={project} />
        ))}

        <h3 className="mt-12 mb-5 font-display text-[1.875rem] text-fg">More projects</h3>
        <ul className="grid gap-5 md:grid-cols-2">
          {otherProjects.map((project) => (
            <li key={project.slug} className="card flex flex-col rounded-[var(--radius-lg)] p-6">
              <h4 className="font-display text-[1.375rem] text-fg">{project.name}</h4>
              <p className="tabular mt-0.5 text-sm font-medium text-fg-soft">
                {[project.year, project.team, project.status === "live" ? null : statusLabels[project.status]].filter(Boolean).join(" · ")}
              </p>
              <p className="mt-3 text-[0.9375rem] text-fg">{project.summary}</p>
              <p className="mt-1 mb-5 text-[0.9375rem] text-fg-soft">{project.built}.</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-3 text-sm font-semibold">
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center gap-1.5 text-accent hover:text-accent-hover">
                    <span className="sr-only">Visit {project.name} at </span>{hostname(project.url)} <Arrow className="size-[0.6875rem]" />
                  </a>
                ) : null}
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex min-h-8 items-center gap-1.5 text-fg-soft hover:text-fg">
                    Source<span className="sr-only"> code for {project.name}</span> <Arrow className="size-[0.6875rem]" />
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
