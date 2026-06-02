import type { ReactNode } from "react";
import { Container } from "@/components/primitives/container";
import { CaseStudyHero } from "./case-study-hero";
import { CaseStudyPager } from "./case-study-pager";
import type { Project } from "@/lib/projects";

/**
 * Wraps an MDX case study with the editorial chrome: hero, prose container,
 * and prev/next pager. The MDX children render inside a narrow measure column
 * so the reading experience stays comfortable.
 */
export function CaseStudyLayout({
  project,
  children,
}: {
  project: Project;
  children: ReactNode;
}) {
  return (
    <article>
      <CaseStudyHero project={project} />

      <Container>
        <div className="mx-auto max-w-[68ch] py-4 md:py-8">{children}</div>
      </Container>

      <CaseStudyPager current={project} />
    </article>
  );
}
