import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { MonoMeta, MonoTag } from "@/components/primitives/mono-meta";
import { ProjectArt } from "@/components/work/project-art";
import type { Project } from "@/lib/projects";

const statusMap: Record<
  Project["status"],
  { label: string; tone: "ok" | "default" | "warn" }
> = {
  live: { label: "live in production", tone: "ok" },
  "private-client": { label: "private client work", tone: "default" },
  "in-development": { label: "in development", tone: "warn" },
};

/**
 * Editorial hero for a /work/[slug] page. Large serif name, mono spec rail,
 * and a generous art slot. The "table of contents" companion sits below
 * in the article body.
 */
export function CaseStudyHero({ project }: { project: Project }) {
  const s = statusMap[project.status];
  return (
    <section className="relative pt-12 pb-14 md:pt-20 md:pb-20">
      <Container>
        {/* Crumb */}
        <nav
          aria-label="breadcrumb"
          className="mono-label flex items-center gap-2 text-faint"
        >
          <Link href="/#work" className="hover:text-accent">
            §01 / WORK
          </Link>
          <span className="text-line">/</span>
          <span className="text-fg-soft">
            №{project.index} {project.name}
          </span>
        </nav>

        {/* Headline + spec rail */}
        <Grid className="mt-10 items-end">
          <div className="col-span-4 md:col-span-8">
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <MonoTag tone={s.tone}>{s.label}</MonoTag>
              <span className="mono-label">{project.kind}</span>
              <span className="mono-label text-faint">· {project.year}</span>
            </div>

            <h1
              className="font-display text-balance text-[clamp(2.75rem,8vw,8rem)] text-fg"
              style={
                {
                  viewTransitionName: `work-name-${project.slug}`,
                } as React.CSSProperties
              }
            >
              {project.name}
            </h1>

            <p className="mt-8 max-w-2xl text-pretty text-lg text-fg-soft md:text-xl md:leading-relaxed">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[12.5px]">
              {project.url ? (
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-accent px-4 py-2 text-accent-fg transition-transform hover:-translate-y-0.5"
                >
                  Visit live → {prettyHost(project.url)}
                </Link>
              ) : null}
              {project.playstore ? (
                <Link
                  href={project.playstore}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-elev/40 px-4 py-2 text-fg-soft transition-colors hover:border-accent hover:text-accent"
                >
                  Play Store
                  <span aria-hidden className="text-faint transition-colors group-hover:text-accent">
                    ↗
                  </span>
                </Link>
              ) : null}
              {project.github ? (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg-soft underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  source repository ↗
                </Link>
              ) : null}
            </div>
          </div>

          {/* Spec rail */}
          <aside className="col-span-4 md:col-span-4 md:col-start-9">
            <div className="rule-t rule-b grid grid-cols-2 gap-x-6 gap-y-6 py-6">
              <MonoMeta label="INDEX" value={`№${project.index}`} />
              <MonoMeta label="YEAR" value={project.year} />
              <MonoMeta label="DOMAIN" value={project.kind} />
              <MonoMeta label="STATUS" value={s.label} />
              {project.metrics.slice(0, 2).map((m) => (
                <MonoMeta key={m.label} label={m.label} value={m.value} />
              ))}
            </div>
          </aside>
        </Grid>

        {/* Stack chips strip */}
        <div className="mt-10 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line bg-bg-elev/40 px-3 py-1.5 font-mono text-[11px] text-fg-soft"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Hero art */}
        <div
          className="mt-12 aspect-[21/9] overflow-hidden rounded-lg border border-line md:mt-16"
          style={
            {
              viewTransitionName: `work-art-${project.slug}`,
            } as React.CSSProperties
          }
        >
          <ProjectArt project={project} priority />
        </div>
      </Container>
    </section>
  );
}

function prettyHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
