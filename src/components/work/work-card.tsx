import Link from "next/link";
import { cn } from "@/lib/utils";
import { MonoTag } from "@/components/primitives/mono-meta";
import type { Project } from "@/lib/projects";
import { ProjectArt } from "./project-art";

/**
 * Editorial case-study card. Two-column on desktop (art + content),
 * stacks on mobile. Used inside the scroll-stack so each card behaves
 * like a self-contained spec sheet.
 */
export function WorkCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const statusLabel: Record<Project["status"], { label: string; tone: "ok" | "default" | "warn" }> = {
    live: { label: "live in production", tone: "ok" },
    "private-client": { label: "private client work", tone: "default" },
    "in-development": { label: "in development", tone: "warn" },
  };
  const s = statusLabel[project.status];

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl border border-line bg-bg-elev/95 shadow-[0_24px_60px_-30px_rgb(0_0_0_/_0.6)] backdrop-blur-sm",
        className,
      )}
    >
      {/* Top metadata strip */}
      <div className="flex items-center justify-between border-b border-line/80 px-6 py-3 md:px-8">
        <MonoTag tone={s.tone}>{s.label}</MonoTag>
        <span className="mono-label">
          <span className="text-accent">№{project.index}</span>
          <span className="mx-2 text-faint">/</span>
          {project.year}
        </span>
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Art slot */}
        <div className="relative aspect-[16/10] border-b border-line md:col-span-7 md:aspect-auto md:border-b-0 md:border-r">
          <ProjectArt project={project} />
        </div>

        {/* Content slot */}
        <div className="flex flex-col gap-5 p-6 md:col-span-5 md:gap-6 md:p-8">
          <header className="flex flex-col gap-2">
            <span className="mono-label">{project.kind}</span>
            <h3 className="font-display text-balance text-5xl text-fg md:text-6xl">
              {project.name}
            </h3>
          </header>

          <p className="text-pretty text-[15px] leading-relaxed text-fg-soft">
            {project.tagline}
          </p>

          {/* Metrics row — spec-sheet bullets */}
          <ul className="flex flex-col gap-2 border-t border-line/80 pt-5">
            {project.metrics.map((m) => (
              <li
                key={m.label}
                className="flex items-baseline justify-between gap-4 font-mono text-[12px]"
              >
                <span className="mono-label">{m.label}</span>
                <span className="flex-1 border-b border-dashed border-line/80 translate-y-[-3px]" />
                <span className="text-fg-soft">{m.value}</span>
              </li>
            ))}
          </ul>

          {/* Stack chips */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-bg/40 px-2.5 py-1 font-mono text-[10.5px] tracking-tight text-fg-soft"
              >
                {s}
              </span>
            ))}
          </div>

          {/* Footer actions */}
          <footer className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line/80 pt-5">
            <Link
              href={`/work/${project.slug}`}
              className="group/cta inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 font-mono text-[11.5px] text-bg transition-transform hover:-translate-y-0.5"
            >
              Read case study
              <span
                aria-hidden
                className="transition-transform group-hover/cta:translate-x-0.5"
              >
                →
              </span>
            </Link>

            {project.url ? (
              <Link
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11.5px] text-fg-soft underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {prettyHost(project.url)} ↗
              </Link>
            ) : null}

            {project.github ? (
              <Link
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11.5px] text-fg-soft underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                source ↗
              </Link>
            ) : null}
          </footer>
        </div>
      </div>
    </article>
  );
}

function prettyHost(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
