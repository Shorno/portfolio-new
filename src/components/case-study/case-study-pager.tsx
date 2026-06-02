import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Rule } from "@/components/primitives/rule";
import { featuredProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

/**
 * Prev / next pager at the bottom of each case study.
 * Wraps cyclically: after the last project, it points back to the first.
 */
export function CaseStudyPager({ current }: { current: Project }) {
  const idx = featuredProjects.findIndex((p) => p.slug === current.slug);
  const prev =
    featuredProjects[(idx - 1 + featuredProjects.length) % featuredProjects.length];
  const next = featuredProjects[(idx + 1) % featuredProjects.length];

  return (
    <section className="mt-24 mb-16 md:mt-32">
      <Container>
        <Rule variant="ticked" />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:items-end">
          {/* prev */}
          <div className="md:col-span-1">
            <span className="mono-label text-faint">← previous</span>
            <Link
              href={`/work/${prev.slug}`}
              className="group mt-2 flex flex-col gap-1"
            >
              <span className="mono-label text-accent">№{prev.index}</span>
              <span className="font-display text-3xl text-fg group-hover:text-accent">
                {prev.name}
              </span>
              <span className="mono-label">{prev.kind}</span>
            </Link>
          </div>

          {/* back to index */}
          <div className="md:col-span-1 md:text-center">
            <Link
              href="/#work"
              className="mono-label inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev/40 px-4 py-2 transition-colors hover:border-accent hover:text-accent"
            >
              ↑ all case studies
            </Link>
          </div>

          {/* next */}
          <div className="md:col-span-1 md:text-right">
            <span className="mono-label text-faint">next →</span>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-2 flex flex-col gap-1 md:items-end"
            >
              <span className="mono-label text-accent">№{next.index}</span>
              <span className="font-display text-3xl text-fg group-hover:text-accent">
                {next.name}
              </span>
              <span className="mono-label">{next.kind}</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
