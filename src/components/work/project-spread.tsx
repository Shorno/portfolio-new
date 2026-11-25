/**
 * Featured project card: details on the left, screenshot in a tinted
 * frame on the right (on top on mobile). Details are a small fact table
 * (Team, Built, Results, Stack) so a reader can scan the same row
 * across projects. Results render only when the data holds
 * owner-confirmed values. The live link shows its real address.
 */
import Image from "next/image";
import type { ReactNode } from "react";
import { Arrow } from "@/components/primitives/arrow";
import { ButtonLink } from "@/components/primitives/button-link";
import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { type Project, type ProjectTint, statusLabels } from "@/lib/projects";
import { cn, hostname } from "@/lib/utils";
import { PlateReveal } from "./plate-reveal";

export const tintClass: Record<ProjectTint, string> = {
  mint: "bg-tint-mint",
  sand: "bg-tint-sand",
  sky: "bg-tint-sky",
  lilac: "bg-tint-lilac",
};

export function ProjectSpread({ project }: { project: Project }) {
  const meta = [project.client, project.year, project.status === "live" ? null : statusLabels[project.status]].filter(Boolean);

  return (
    <PlateReveal className="mb-5">
      <article aria-labelledby={`project-${project.slug}`} className="group card grid overflow-hidden md:grid-cols-[1fr_1.35fr]">
        <div className="flex flex-col p-6 md:p-9">
          <h3 id={`project-${project.slug}`} className="font-display text-[1.875rem] text-fg">
            {project.name}
          </h3>
          <p className="tabular mt-1 text-sm font-medium text-fg-soft">{meta.join(" · ")}</p>
          <p className="mt-4 text-fg">{project.summary}</p>

          <dl className="mt-5 mb-7 border-t border-line">
            <Row term="Team">{project.team}</Row>
            <Row term="Built">{project.built}</Row>
            {project.results?.length ? (
              <Row term={project.results.length > 1 ? "Results" : "Result"}>
                <ul className="grid gap-1 font-semibold">
                  {project.results.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </Row>
            ) : null}
            <Row term="Stack">{project.stack.join(", ")}</Row>
          </dl>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
            {project.url ? (
              <ButtonLink variant="ink" size="sm" arrow href={project.url} target="_blank" rel="noreferrer">
                <span className="sr-only">Visit {project.name} at </span>{hostname(project.url)}
              </ButtonLink>
            ) : null}
            {project.playstore ? <TextLink href={project.playstore}>Google Play</TextLink> : null}
            {project.github ? <TextLink href={project.github}>Source code</TextLink> : null}
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

function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[4.75rem_1fr] gap-3 border-b border-line py-2.5 text-[0.9375rem]">
      <dt className="pt-px text-sm font-medium text-fg-soft">{term}</dt>
      <dd className="text-fg">{children}</dd>
    </div>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent hover:text-accent">
      {children}
      <Arrow className="size-[0.6875rem]" />
    </a>
  );
}
