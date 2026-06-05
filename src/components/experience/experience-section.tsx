import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { SectionMark } from "@/components/primitives/section-mark";
import { Rule } from "@/components/primitives/rule";
import { education, experience, totalMonths } from "@/lib/experience";
import { ExperienceEntry } from "./experience-entry";

/**
 * §02 EXPERIENCE — editorial spec-sheet timeline of part-time roles.
 *
 * Each entry is rendered by <ExperienceEntry />: mono date rail on the left,
 * serif company name + role + summary + highlights + stack chips on the right.
 * Hairline rules between entries.
 */
export function ExperienceSection() {
  const months = totalMonths();
  const hint = `${experience.length} roles · ~${months} months`;

  return (
    <section id="experience" className="relative py-20 md:py-28">
      <Container>
        <SectionMark index={2} label="EXPERIENCE" hint={hint} />

        <Grid className="mt-14 items-end">
          <div className="col-span-4 md:col-span-7">
            <h2 className="font-display text-balance text-4xl text-fg md:text-6xl">
              Where it{" "}
              <span className="font-display-italic text-accent">shipped.</span>
            </h2>
            <p className="mt-6 max-w-md text-pretty text-fg-soft md:text-lg md:leading-relaxed">
              ~{months} months shipping production systems across two engineering
              roles. Most of the case studies above came from the most recent
              one, alongside a CSE degree (graduating 2026).
            </p>
          </div>
          <div className="col-span-4 md:col-span-5">
            <div className="grid grid-cols-2 gap-6 border-t border-line pt-5">
              <Stat label="ROLES" value={experience.length} />
              <Stat label="MONTHS" value={`~${months}`} />
            </div>
          </div>
        </Grid>

        <Rule variant="ticked" className="mt-12" />

        <div className="divide-y divide-line">
          {experience.map((entry) => (
            <ExperienceEntry key={`${entry.company}-${entry.start}`} entry={entry} />
          ))}
        </div>

        <Rule variant="ticked" />

        <p className="mt-6 flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5 font-mono text-[11.5px] tracking-tight text-fg-soft">
          <span className="mono-label text-accent">EDU</span>
          <Sep />
          <span>
            {education.degree}, {education.field}
          </span>
          <Sep />
          <span className="text-faint">{education.school}</span>
          <Sep />
          <span className="text-faint">
            {education.start}—{education.end}
          </span>
          <Sep />
          <span className="text-faint">CGPA {education.cgpa}</span>
        </p>
      </Container>
    </section>
  );
}

function Sep() {
  return (
    <span aria-hidden className="text-line">
      ·
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="mono-label">{label}</span>
      <span className="font-display text-3xl text-fg md:text-4xl">{value}</span>
    </div>
  );
}
