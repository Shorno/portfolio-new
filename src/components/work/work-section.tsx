/**
 * Featured projects as split cards, the rest as preview cards: the live
 * screenshot fills the card and a solid details panel sits at its foot,
 * so the product is seen before it is read about. Every project links to
 * the live product by its real address; there are no case-study pages.
 */
import Image from "next/image";
import { Arrow } from "@/components/primitives/arrow";
import { BlockHead } from "@/components/primitives/block-head";
import { Container } from "@/components/primitives/container";
import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { type Project, featuredProjects, otherProjects, statusLabels } from "@/lib/projects";
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
            <PreviewCard key={project.slug} project={project} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function PreviewCard({ project }: { project: Project }) {
  const meta = [project.client, project.year, project.team, project.status === "live" ? null : statusLabels[project.status]].filter(Boolean);

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-line bg-bg-elev shadow-card">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-surface">
        <Image
          src={cloudinaryImageUrl(project.image, { width: 1200, crop: "limit" })}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1200px) 590px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="z-[1] -mt-12 flex flex-1 flex-col rounded-t-[var(--radius-lg)] bg-bg-elev p-5 shadow-[0_-10px_30px_-12px_rgb(22_24_27/0.28)] md:-mt-14 md:p-6">
        <h4 className="font-display text-[1.375rem] text-fg">
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:content-['']">
              {project.name}
            </a>
          ) : project.name}
        </h4>
        <p className="tabular mt-0.5 text-sm font-medium text-fg-soft">{meta.join(" · ")}</p>
        <p className="mt-3 text-[0.9375rem] text-fg">{project.summary}</p>
        <p className="mt-1 mb-4 text-[0.9375rem] text-fg-soft">{project.built}.</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-3 text-sm font-semibold">
          {project.url ? (
            <span className="inline-flex min-h-8 items-center gap-1.5 text-accent group-hover:text-accent-hover">
              {hostname(project.url)}
              <Arrow className="size-[0.6875rem] transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          ) : null}
          {project.github ? (
            <a href={project.github} target="_blank" rel="noreferrer" className="relative z-10 inline-flex min-h-8 items-center gap-1.5 text-fg-soft hover:text-fg">
              Source<span className="sr-only"> code for {project.name}</span> <Arrow className="size-[0.6875rem]" />
            </a>
          ) : null}
        </div>
      </div>
    </li>
  );
}
