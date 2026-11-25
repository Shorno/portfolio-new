/**
 * Work experience as a timeline card, with education as its last entry,
 * beside a skills card of grouped chips.
 */
import type { ReactNode } from "react";
import { Chip } from "@/components/primitives/chip";
import { Container } from "@/components/primitives/container";
import { education, experience, formatPeriod, formatType } from "@/lib/experience";
import { skillGroups } from "@/lib/system";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="pt-16 md:pt-20">
      <Container className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
        <div className="card p-6 md:p-8">
          <h2 id="experience-title" className="mb-6 font-display text-[1.875rem] text-fg">Work experience</h2>
          <ol className="relative before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-0.5 before:rounded-full before:bg-line">
            {experience.map((entry) => (
              <TimelineItem key={`${entry.company}-${entry.start}`} when={formatPeriod(entry.start, entry.end)}>
                <p className="font-bold text-fg">
                  {entry.role},{" "}
                  {entry.companyUrl ? (
                    <a href={entry.companyUrl} target="_blank" rel="noreferrer" className="text-accent underline decoration-1 underline-offset-[3px] hover:text-accent-hover">
                      {entry.company}
                    </a>
                  ) : entry.company}
                  {entry.end === "present" ? (
                    <span className="ml-2 rounded-full bg-tint-mint px-2 py-0.5 align-[2px] text-xs font-bold text-tint-mint-fg">Current</span>
                  ) : null}
                </p>
                <p className="text-[0.9375rem] text-fg-soft">
                  {formatType(entry.type)}{entry.scope ? ` · ${entry.scope}` : ""}
                </p>
              </TimelineItem>
            ))}
            <TimelineItem when={`${education.start} – ${education.end}`} education last>
              <p className="font-bold text-fg">{education.degree} in {education.field}</p>
              <p className="text-[0.9375rem] text-fg-soft">{education.school} · CGPA {education.cgpa}</p>
            </TimelineItem>
          </ol>
        </div>

        <div id="skills" data-anchor className="card p-6 md:p-8">
          <h2 className="mb-6 font-display text-[1.875rem] text-fg">Skills</h2>
          <div className="grid gap-[1.125rem]">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3 className="mb-2 text-sm font-semibold text-fg-soft">{group.label}</h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.tools.map((tool) => <li key={tool}><Chip>{tool}</Chip></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function TimelineItem({
  when,
  education,
  last,
  children,
}: {
  when: string;
  education?: boolean;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <li className={cn("relative pl-[2.125rem]", last ? "pb-0" : "pb-[1.375rem]")}>
      <span
        aria-hidden
        className={cn(
          "absolute top-[5px] left-0 size-4 rounded-full border-[3px] bg-bg-elev",
          education ? "border-line-strong" : "border-accent",
        )}
      />
      <p className="tabular text-sm text-fg-soft">{when}</p>
      {children}
    </li>
  );
}
