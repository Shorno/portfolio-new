/**
 * Work experience and education as dated rows, beside skills as grouped
 * rows. Both cards share one row pattern (label column, value column,
 * hairline between rows) so the section reads like a CV, not a widget.
 */
import type { ReactNode } from "react";
import { Container } from "@/components/primitives/container";
import { education, experience, formatPeriod, formatType } from "@/lib/experience";
import { skillGroups } from "@/lib/system";

export function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="pt-16 md:pt-20">
      <Container className="grid gap-5 md:grid-cols-[1.2fr_1fr]">
        <div className="card p-6 md:p-8">
          <h2 id="experience-title" className="mb-4 font-display text-[1.875rem] text-fg">Work experience</h2>
          <ol>
            {experience.map((entry) => (
              <Row key={`${entry.company}-${entry.start}`} label={formatPeriod(entry.start, entry.end)}>
                <p className="font-semibold text-fg">
                  {entry.role},{" "}
                  {entry.companyUrl ? (
                    <a href={entry.companyUrl} target="_blank" rel="noreferrer" className="text-accent underline decoration-1 underline-offset-[3px] hover:text-accent-hover">
                      {entry.company}
                    </a>
                  ) : entry.company}
                </p>
                <p className="text-[0.9375rem] text-fg-soft">
                  {formatType(entry.type)}{entry.scope ? `. ${entry.scope}` : ""}
                </p>
              </Row>
            ))}
          </ol>

          <h3 className="mt-8 mb-2 font-display text-[1.375rem] text-fg">Education</h3>
          <ol>
            <Row label={`${education.start} – ${education.end}`}>
              <p className="font-semibold text-fg">{education.degree} in {education.field}</p>
              <p className="text-[0.9375rem] text-fg-soft">{education.school}. CGPA {education.cgpa}</p>
            </Row>
          </ol>
        </div>

        <div id="skills" data-anchor className="card p-6 md:p-8">
          <h2 className="mb-4 font-display text-[1.875rem] text-fg">Skills</h2>
          <dl>
            {skillGroups.map((group) => (
              <div key={group.label} className="grid gap-1 border-t border-line py-3.5 first:border-t-0 first:pt-0 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-fg-soft">{group.label}</dt>
                <dd className="text-[0.9375rem] font-medium text-fg">{group.tools.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li className="grid gap-1 border-t border-line py-4 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
      <p className="tabular text-sm font-medium text-fg-soft sm:pt-px">{label}</p>
      <div>{children}</div>
    </li>
  );
}
