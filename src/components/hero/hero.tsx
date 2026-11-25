/**
 * Hero: an intro card (headline, short bio, two actions) beside a profile
 * card that answers the recruiter's first questions as plain facts:
 * current roles, experience, location, availability, education.
 * Every value comes from the profile and experience data.
 */
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/primitives/button-link";
import { Container } from "@/components/primitives/container";
import { careerStart, education, experience, formatType } from "@/lib/experience";
import { site } from "@/lib/site";

export function Hero() {
  const currentRoles = experience.filter((entry) => entry.end === "present");

  return (
    <section aria-labelledby="hero-title">
      <Container className="grid gap-5 pt-6 md:grid-cols-[1.35fr_1fr] md:pt-12">
        <div className="card flex flex-col p-7 md:p-11">
          <h1 id="hero-title" className="mb-5 font-display text-[clamp(2.4rem,4.6vw,3.9rem)] text-balance text-fg">
            Full-stack engineer building web and mobile apps.
          </h1>
          <p className="mb-8 max-w-[54ch] text-lg text-fg-soft">{site.intro}</p>
          <div className="mt-auto flex flex-wrap gap-2.5">
            <ButtonLink variant="accent" href="#contact">Get in touch</ButtonLink>
            <ButtonLink href={site.cvUrl} target="_blank" rel="noreferrer">View resume</ButtonLink>
          </div>
        </div>

        <div className="rounded-[var(--radius-xl)] bg-tint-sand p-7 md:p-9">
          <h2 className="font-display text-[1.375rem] text-fg">Profile</h2>
          <dl className="mt-4">
            <Fact term="Currently">
              <ul className="grid gap-1">
                {currentRoles.map((entry) => (
                  <li key={entry.company}>
                    {entry.role} at {entry.company}
                    {entry.type !== "full-time" ? <span className="whitespace-nowrap text-fg-soft"> ({formatType(entry.type).toLowerCase()})</span> : null}
                  </li>
                ))}
              </ul>
            </Fact>
            <Fact term="Experience">Building production apps since {careerStart()}</Fact>
            <Fact term="Based in">{site.location} ({site.timezoneLabel})</Fact>
            <Fact term="Open to">{site.seeking.open ? `Full-stack roles: ${site.workTypes.join(", ").toLowerCase()}` : "Not looking right now"}</Fact>
            <Fact term="Education">{`${education.degree} in ${education.field}, ${education.school}, ${education.end}`}</Fact>
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Fact({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-fg/10 py-3.5 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
      <dt className="text-sm font-medium text-fg-soft">{term}</dt>
      <dd className="text-[0.9375rem] font-medium text-fg">{children}</dd>
    </div>
  );
}
