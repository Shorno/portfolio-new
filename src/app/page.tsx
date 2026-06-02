import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { SectionMark } from "@/components/primitives/section-mark";
import { MonoMeta } from "@/components/primitives/mono-meta";
import { Rule } from "@/components/primitives/rule";
import { Hero } from "@/components/hero/hero";
import { WorkStack } from "@/components/work/work-stack";
import { site } from "@/lib/site";
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

      {/* ---------------- §02 SYSTEM ---------------- */}
      <section id="system" className="relative py-16">
        <Container>
          <SectionMark index={2} label="SYSTEM" hint="tools of trade" />
          <Grid className="mt-12">
            <div className="col-span-4 md:col-span-5">
              <h2 className="font-display text-4xl text-fg md:text-5xl">
                A small,{" "}
                <span className="font-display-italic">sharp</span> toolkit.
              </h2>
              <p className="mt-4 max-w-md text-fg-soft">
                I pick boring, fast tools and obsess over the parts users
                actually touch.
              </p>
            </div>
            <div className="col-span-4 md:col-span-6 md:col-start-7">
              <Rule variant="ticked" />
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
                <MonoMeta label="RUNTIME" value="TypeScript · Bun · Node" />
                <MonoMeta label="DATA" value="Postgres · Drizzle · Neon" />
                <MonoMeta label="AUTH" value="Better-Auth · oRPC" />
                <MonoMeta label="UI" value="React 19 · Tailwind v4 · shadcn" />
                <MonoMeta label="MOBILE" value="React Native · Expo" />
                <MonoMeta label="INFRA" value="Vercel · Turborepo · Hono" />
              </dl>
            </div>
          </Grid>
        </Container>
      </section>

      {/* ---------------- §03 INDEX ---------------- */}
      <section id="index" className="relative py-16">
        <Container>
          <SectionMark index={3} label="INDEX" hint="archive" />
          <p className="mt-8 max-w-md font-mono text-[12px] text-muted">
            Full archive coming in phase 4. — populated from the GitHub API.
          </p>
        </Container>
      </section>

      {/* ---------------- §04 CONTACT ---------------- */}
      <section id="contact" className="relative py-20">
        <Container>
          <SectionMark index={4} label="CONTACT" hint="one line" />
          <div className="mt-12 flex flex-col gap-6">
            <p className="font-display text-balance text-[clamp(2rem,5vw,4.5rem)] text-fg">
              Got something{" "}
              <span className="font-display-italic text-accent">serious</span>{" "}
              to build?
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group w-fit font-mono text-base text-fg-soft transition-colors hover:text-fg"
            >
              <span className="mono-label mr-3 text-faint">WRITE↗</span>
              <span className="underline decoration-line decoration-1 underline-offset-4 group-hover:decoration-accent">
                {site.email}
              </span>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}

