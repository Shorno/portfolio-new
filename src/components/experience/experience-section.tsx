/** Employment comes before the project list; education stays beside the timeline. */
import { Container } from "@/components/primitives/container";
import { SectionMark } from "@/components/primitives/section-mark";
import { education, experience } from "@/lib/experience";
import { ExperienceEntry } from "./experience-entry";

export function ExperienceSection() {
  return (
    <section id="experience" className="pb-16 md:pb-20">
      <Container>
        <SectionMark index={1} label="Experience" heading hint="Since 2024" />
        <div className="mt-8 divide-y divide-line">
          {experience.map((entry) => <ExperienceEntry key={`${entry.company}-${entry.start}`} entry={entry} />)}
        </div>
        <div className="grid gap-3 border-t border-line pt-6 md:grid-cols-12 md:gap-8">
          <h3 className="text-sm text-muted md:col-span-3">Education</h3>
          <div className="md:col-span-9">
            <p className="text-base font-medium text-fg">{education.degree}, {education.field}</p>
            <p className="mt-1 text-sm leading-relaxed text-fg-soft">{education.school} · {education.start}–{education.end}</p>
            <p className="mt-1 text-sm text-muted">Graduated {education.graduationMonth} {education.end} · CGPA {education.cgpa}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
