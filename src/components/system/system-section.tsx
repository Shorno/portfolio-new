/** Skills are grouped by work performed, with an example instead of proficiency scores. */
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { SectionMark } from "@/components/primitives/section-mark";
import { getProjectBySlug } from "@/lib/projects";
import { skillGroups } from "@/lib/system";

export function SystemSection() {
  return (
    <section id="system" className="pb-16 md:pb-20">
      <Container>
        <SectionMark index={3} label="Skills" heading hint="Used in the projects above" />
        <div className="mt-8 divide-y divide-line">
          {skillGroups.map((group) => {
            const project = getProjectBySlug(group.projectSlug);
            return (
              <div key={group.label} className="grid gap-3 py-6 md:grid-cols-12 md:gap-8">
                <h3 className="text-lg font-medium text-fg md:col-span-3">{group.label}</h3>
                <div className="md:col-span-6">
                  <p className="text-base font-medium leading-relaxed text-fg">{group.tools.join(" · ")}</p>
                  <p className="mt-2 text-base leading-relaxed text-fg-soft">{group.description}</p>
                </div>
                {project ? <div className="md:col-span-3 md:text-right"><Link href={`/work/${project.slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent">{project.name} <span aria-hidden>↗</span></Link></div> : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}