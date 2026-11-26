/**
 * Featured project cards. Details are a small fact table (Team, Built,
 * Results, Stack) so a reader can scan the same row across projects.
 * Results render only when the data holds owner-confirmed values. The
 * live link shows its real address.
 *
 * Two layouts:
 * - default: details left, screenshot in a tinted frame right (on top on
 *   mobile).
 * - `lead`: the flagship project. Details across the top (summary and
 *   links left, fact table right) with a wide screenshot frame below, so
 *   the largest project reads first and breaks the run of split cards.
 *   On mobile both layouts put the screenshot first.
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

export function ProjectSpread({ project, lead = false }: { project: Project; lead?: boolean }) {
  return (
    <PlateReveal className="mb-5">
      {lead ? <LeadCard project={project} /> : <SplitCard project={project} />}
    </PlateReveal>
  );
}

function SplitCard({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`project-${project.slug}`} className="group card grid overflow-hidden lg:grid-cols-[1fr_1.35fr]">
      <div className="flex flex-col p-6 md:p-9">
        <Intro project={project} />
        <Facts project={project} className="mt-5 mb-7" />
        <Links project={project} className="mt-auto" />
      </div>

      <div className="order-first flex px-4 pt-4 md:px-[1.125rem] md:pt-[1.125rem] lg:order-none lg:pl-0">
        <Shot project={project} sizes="(min-width: 1200px) 620px, (min-width: 1024px) 55vw, 100vw" />
      </div>
    </article>
  );
}

function LeadCard({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`project-${project.slug}`} className="group card flex flex-col overflow-hidden">
      <div className="grid gap-x-12 p-6 md:grid-cols-[1fr_1fr] md:p-10">
        <div className="flex flex-col">
          <Intro project={project} lead />
          <Links project={project} className="mt-7 max-md:hidden" />
        </div>
        <div>
          <Facts project={project} className="mt-5 md:mt-1" />
          <Links project={project} className="mt-7 md:hidden" />
        </div>
      </div>

      <div className="order-first flex px-4 pt-4 md:order-none md:px-[1.125rem] md:pt-0">
        <Shot project={project} wide sizes="(min-width: 1200px) 1160px, 100vw" />
      </div>
    </article>
  );
}

function Intro({ project, lead = false }: { project: Project; lead?: boolean }) {
  const meta = [project.client, project.year, project.status === "live" ? null : statusLabels[project.status]].filter(Boolean);

  return (
    <>
      <h3 id={`project-${project.slug}`} className={cn("font-display text-fg", lead ? "text-[clamp(1.875rem,3.2vw,2.5rem)]" : "text-[1.875rem]")}>
        {project.name}
      </h3>
      <p className="tabular mt-1 text-sm font-medium text-fg-soft">{meta.join(" · ")}</p>
      <p className={cn("mt-4 text-fg", lead && "max-w-[46ch] md:text-lg")}>{project.summary}</p>
    </>
  );
}

function Facts({ project, className }: { project: Project; className?: string }) {
  return (
    <dl className={cn("border-t border-line", className)}>
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
  );
}

function Links({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-3", className)}>
      {project.url ? (
        <ButtonLink variant="ink" size="sm" arrow href={project.url} target="_blank" rel="noreferrer">
          <span className="sr-only">Visit {project.name} at </span>{hostname(project.url)}
        </ButtonLink>
      ) : null}
      {project.playstore ? <TextLink href={project.playstore}>Google Play</TextLink> : null}
      {project.github ? <TextLink href={project.github}>Source code</TextLink> : null}
    </div>
  );
}

function Shot({ project, sizes, wide = false }: { project: Project; sizes: string; wide?: boolean }) {
  return (
    <div className={cn("flex flex-1 items-end rounded-t-[1.125rem] px-4 pt-4", wide ? "md:px-10 md:pt-10" : "md:px-[1.375rem] md:pt-[1.375rem]", tintClass[project.tint])}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-t-[0.75rem] shadow-[0_-2px_30px_-10px_rgb(22_24_27/0.25)] transition-transform duration-[400ms] ease-out group-hover:-translate-y-1.5",
          wide ? "aspect-video md:aspect-[2.2/1]" : "aspect-video",
        )}
      >
        <Image
          src={cloudinaryImageUrl(project.image, { width: wide ? 2000 : 1400, crop: "limit" })}
          alt={project.imageAlt}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    </div>
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
