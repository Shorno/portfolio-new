import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { SectionMark } from "@/components/primitives/section-mark";
import { Rule } from "@/components/primitives/rule";
import { experience, totalMonths } from "@/lib/experience";
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
              Two part-time roles, run alongside a CSE degree. Most of the
              case studies above lived inside the most recent one.
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
      </Container>
    </section>
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
