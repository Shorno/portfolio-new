/** The first screen answers who, what, and where before asking for a click. */
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { experience } from "@/lib/experience";
import { site } from "@/lib/site";

export function Hero() {
  const currentRoles = experience.filter((entry) => entry.end === "present");

  return (
    <section aria-labelledby="profile-name" className="py-16 md:py-20">
      <Container>
        <Grid className="items-end gap-y-10">
          <div className="col-span-4 md:col-span-8">
            <h1 id="profile-name" className="font-display text-[clamp(3.25rem,7vw,6rem)] text-fg">
              Shorno<br />Kamal Roy<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 text-2xl font-medium tracking-tight text-fg md:text-3xl">{site.role}</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-soft md:text-lg">{site.subline}</p>
            <ul aria-label="Primary skills" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm text-fg">
              {site.coreSkills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
            {site.seeking.open ? <p className="mt-5 text-sm text-muted">{site.seeking.headline}.</p> : null}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href={site.cvUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-3 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-accent-fg transition-colors hover:bg-fg hover:text-bg">
                View CV <span aria-hidden>↗</span>
              </Link>
              <Link href={`mailto:${site.email}?subject=${encodeURIComponent(site.hireEmailSubject)}`} className="inline-flex min-h-11 items-center text-sm text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent">Email me</Link>
              <Link href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-fg-soft transition-colors hover:text-accent">LinkedIn <span aria-hidden>↗</span></Link>
            </div>
          </div>

          <aside aria-label="Profile at a glance" className="col-span-4 md:col-span-4 md:border-l md:border-line md:pl-8">
            <dl className="space-y-6">
              <div>
                <dt className="text-sm text-muted">Currently</dt>
                <dd className="mt-3 space-y-3">
                  {currentRoles.map((entry) => (
                    <div key={entry.company}>
                      <Link href={`#experience-${entry.company.toLowerCase()}`} className="text-base font-medium text-fg underline decoration-line underline-offset-4 transition-colors hover:text-accent">{entry.company}</Link>
                      <span className="ml-2 text-sm text-muted">{entry.type}</span>
                      <p className="mt-1 text-sm text-fg-soft">{entry.role}</p>
                    </div>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Focus</dt>
                <dd className="mt-2 max-w-sm text-base leading-relaxed text-fg">{site.focus}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">Based in</dt>
                <dd className="mt-2 text-base text-fg">{site.location}</dd>
              </div>
            </dl>
          </aside>
        </Grid>
      </Container>
    </section>
  );
}
