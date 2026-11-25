/**
 * Featured projects as split cards, the rest as compact cards.
 * Every project links to the live product; there are no case-study pages.
 */
import { Arrow } from "@/components/primitives/arrow";
import { BlockHead } from "@/components/primitives/block-head";
import { Chip } from "@/components/primitives/chip";
import { Container } from "@/components/primitives/container";
import { featuredProjects, otherProjects, statusLabels } from "@/lib/projects";
import { ProjectSpread } from "./project-spread";

export function WorkSection() {
  const allFeaturedLive = featuredProjects.every((p) => p.status === "live");

  return (
    <section id="projects" aria-labelledby="projects-title" className="pt-16 md:pt-20">
      <Container>
        <BlockHead
          id="projects-title"
          title="Featured projects"
          intro={`Production apps I’ve built for employers and clients.${allFeaturedLive ? " Every one is live." : ""}`}
        />

        {featuredProjects.map((project) => (
          <ProjectSpread key={project.slug} project={project} />
        ))}

        <h3 className="mt-12 mb-5 font-display text-[1.625rem] text-fg">More projects</h3>
        <ul className="grid gap-5 md:grid-cols-3">
          {otherProjects.map((project) => (
            <li key={project.slug} className="group card relative flex flex-col gap-2 rounded-[var(--radius-lg)] p-6 transition-transform duration-[250ms] ease-out hover:-translate-y-[3px] hover:-rotate-[0.4deg]">
              <div className="flex items-center justify-between">
                <Chip tone={project.status === "live" ? "live" : "muted"}>{statusLabels[project.status]}</Chip>
                <span aria-hidden className="grid size-9 place-items-center rounded-full bg-bg text-fg transition-[transform,background-color,color] duration-200 group-hover:rotate-45 group-hover:bg-ink group-hover:text-ink-fg">
                  <Arrow className="size-3" />
                </span>
              </div>
              <h4 className="font-display text-[1.375rem] text-fg">
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:rounded-[inherit] after:content-['']">
                    {project.name}
                  </a>
                ) : project.name}
              </h4>
              <p className="text-[0.9375rem] text-fg-soft">{project.summary}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-line pt-2.5 text-sm font-medium text-fg">
                <span>{project.role}</span>
                {project.github ? (
                  <a href={project.github} target="_blank" rel="noreferrer" className="relative z-10 inline-flex min-h-8 items-center gap-1 text-accent underline underline-offset-[3px] hover:text-accent-hover">
                    Source<span className="sr-only"> code for {project.name}</span> <Arrow />
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
