/**
 * Hero: an intro card (status, headline, short bio, two actions) beside a
 * small grid of fact tiles. Every figure is derived from the project and
 * experience data, never typed in.
 */
import { ButtonLink } from "@/components/primitives/button-link";
import { Container } from "@/components/primitives/container";
import { experience, formatType, yearsOfExperience } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Hero() {
  const currentRoles = experience.filter((entry) => entry.end === "present");
  const years = yearsOfExperience();

  return (
    <section aria-labelledby="hero-title">
      <Container className="grid gap-5 pt-6 md:grid-cols-[1.35fr_1fr] md:pt-12">
        <div className="card relative overflow-hidden p-7 md:p-11">
          <div aria-hidden className="pointer-events-none absolute -top-12 -right-12 size-48 rounded-full bg-tint-sky blur-2xl" />
          <p className="relative inline-flex items-center gap-2 rounded-full bg-tint-mint py-1.5 pr-3.5 pl-2.5 text-sm font-semibold text-tint-mint-fg">
            <span aria-hidden className="size-2 rounded-full bg-signal-ok shadow-[0_0_0_4px_color-mix(in_oklab,var(--signal-ok)_20%,transparent)]" />
            {site.seeking.headline}
          </p>
          <h1 id="hero-title" className="relative mt-6 mb-5 font-display text-[clamp(2.4rem,4.6vw,3.9rem)] text-balance text-fg">
            Full-stack developer building <span className="text-accent">web and mobile apps</span> people use every day.
          </h1>
          <p className="relative mb-7 max-w-[54ch] text-lg text-fg-soft">{site.intro}</p>
          <div className="relative flex flex-wrap gap-2.5">
            <ButtonLink variant="accent" arrow href="#contact">Get in touch</ButtonLink>
            <ButtonLink href={site.cvUrl} target="_blank" rel="noreferrer">View resume</ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-rows-[1fr_auto_auto]">
          <FactTile label="Years of experience" value={`${years}+`} className="bg-tint-mint" />
          <FactTile label="Projects shipped" value={String(projects.length)} className="bg-tint-sand" />

          <div className="card col-span-2 rounded-[var(--radius-lg)] p-5">
            <p className="text-sm font-medium text-fg-soft">Currently working at</p>
            <ul className="mt-3 grid gap-2.5">
              {currentRoles.map((entry) => (
                <li key={entry.company} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 rounded-[var(--radius-md)] bg-bg px-3.5 py-2.5">
                  <span className="font-bold text-fg">{entry.company}</span>
                  <span className="text-sm text-fg-soft">{entry.role} · {formatType(entry.type)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card col-span-2 flex flex-wrap items-end justify-between gap-4 rounded-[var(--radius-lg)] p-5">
            <div>
              <p className="text-sm font-medium text-fg-soft">Location</p>
              <p className="font-semibold text-fg">{site.location} ({site.timezoneLabel})</p>
            </div>
            <div className="sm:text-right">
              <p className="text-sm font-medium text-fg-soft">Work type</p>
              <p className="font-semibold text-fg">{site.workTypes.join(" · ")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FactTile({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={cn("flex flex-col justify-between gap-6 rounded-[var(--radius-lg)] p-5", className)}>
      <p className="text-sm font-medium text-fg">{label}</p>
      <p className="tabular font-display text-[clamp(2.75rem,5vw,4rem)] leading-none text-fg">{value}</p>
    </div>
  );
}
