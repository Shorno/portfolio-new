/**
 * Featured project card: details on the left, screenshot in a tinted
 * frame on the right (on top on mobile). Team and results render only
 * when the data holds owner-confirmed values.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/primitives/button-link";
import { Chip } from "@/components/primitives/chip";
import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { type Project, type ProjectTint, statusLabels } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { PlateReveal } from "./plate-reveal";

export const tintClass: Record<ProjectTint, string> = {
  mint: "bg-tint-mint",
  sand: "bg-tint-sand",
  sky: "bg-tint-sky",
  lilac: "bg-tint-lilac",
};

export function ProjectSpread({ project }: { project: Project }) {
  return (
    <PlateReveal className="mb-5">
      <article
        aria-labelledby={`project-${project.slug}`}
        className="group card grid overflow-hidden transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lift md:grid-cols-[1fr_1.35fr]"
      >
        <div className="flex flex-col p-6 md:p-9">
          <div className="flex flex-wrap gap-2">
            <Chip tone={project.status === "live" ? "live" : "muted"}>{statusLabels[project.status]}</Chip>
            <Chip tone="muted">{project.year}</Chip>
            {project.client ? <Chip tone="muted">{project.client}</Chip> : null}
          </div>
          <h3 id={`project-${project.slug}`} className="mt-4 mb-2 font-display text-[1.875rem] text-fg">
            {project.name}
          </h3>
          <p className="mb-4 text-fg">{project.summary}</p>
          <ul className="mb-5 grid gap-2 text-[0.9375rem] text-fg-soft">
            <Point><b className="font-semibold text-fg">Role:</b> {project.role}</Point>
            {project.team ? <Point><b className="font-semibold text-fg">Team:</b> {project.team}</Point> : null}
            {project.highlights?.map((h) => <Point key={h}>{h}</Point>)}
            {project.results?.map((r) => <Point key={r}><span className="font-semibold text-fg">{r}</span></Point>)}
          </ul>
          <ul aria-label={`${project.name} tech stack`} className="mb-6 flex flex-wrap gap-1.5">
            {project.stack.map((t) => <li key={t}><Chip>{t}</Chip></li>)}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2.5">
            {project.url ? (
              <ButtonLink variant="ink" size="sm" arrow href={project.url} target="_blank" rel="noreferrer">
                Visit site<span className="sr-only">: {project.name}</span>
              </ButtonLink>
            ) : null}
            {project.playstore ? (
              <ButtonLink size="sm" href={project.playstore} target="_blank" rel="noreferrer">Google Play</ButtonLink>
            ) : null}
            {project.github ? (
              <ButtonLink size="sm" href={project.github} target="_blank" rel="noreferrer">Source code</ButtonLink>
            ) : null}
          </div>
        </div>

        <div className="order-first flex px-4 pt-4 md:order-none md:pt-[1.125rem] md:pr-[1.125rem] md:pl-0">
          <div className={cn("flex flex-1 items-end rounded-t-[1.125rem] px-4 pt-4 md:px-[1.375rem] md:pt-[1.375rem]", tintClass[project.tint])}>
            <div className="relative aspect-video w-full overflow-hidden rounded-t-[0.75rem] shadow-[0_-2px_30px_-10px_rgb(22_24_27/0.25)] transition-transform duration-[400ms] ease-out group-hover:-translate-y-1.5">
              <Image
                src={cloudinaryImageUrl(project.image, { width: 1400, crop: "limit" })}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 1200px) 620px, (min-width: 768px) 55vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </article>
    </PlateReveal>
  );
}

function Point({ children }: { children: ReactNode }) {
  return (
    <li className="relative pl-[1.375rem]">
      <span aria-hidden className="absolute top-[0.5625rem] left-1 size-2 rotate-45 rounded-[3px] bg-accent" />
      {children}
    </li>
  );
}
