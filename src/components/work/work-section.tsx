/** Selected work stays in document flow so every project can be scanned at any height. */
import { Container } from "@/components/primitives/container";
import { SectionMark } from "@/components/primitives/section-mark";
import { featuredProjects } from "@/lib/projects";
import { WorkCard } from "./work-card";

export function WorkSection() {
  return (
    <section id="work" className="pb-16 md:pb-20">
      <Container>
        <SectionMark index={2} label="Selected projects" heading hint={`${featuredProjects.length} case studies`} />
        <div className="mt-8">
          {featuredProjects.map((project) => <WorkCard key={project.slug} project={project} />)}
        </div>
      </Container>
    </section>
  );
}
