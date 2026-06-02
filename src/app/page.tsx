import { Container } from "@/components/primitives/container";
import { SectionMark } from "@/components/primitives/section-mark";
import { Hero } from "@/components/hero/hero";
import { WorkStack } from "@/components/work/work-stack";
import { ExperienceSection } from "@/components/experience/experience-section";
import { SystemSection } from "@/components/system/system-section";
import { IndexSection } from "@/components/index/index-section";
import { ContactSection } from "@/components/contact/contact-section";
import { featuredProjects } from "@/lib/projects";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ---------------- §01 WORK ---------------- */}
      <section id="work" className="relative pt-16">
        <Container>
          <SectionMark
            index={1}
            label="WORK"
            hint={`${featuredProjects.length} case studies · scroll`}
          />
        </Container>
        <Container className="mt-10">
          <WorkStack projects={featuredProjects} />
        </Container>
      </section>

      <ExperienceSection />
      <SystemSection />
      <IndexSection />
      <ContactSection />
    </>
  );
}

