import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { SectionMark } from "@/components/primitives/section-mark";
import { MonoMeta, MonoTag } from "@/components/primitives/mono-meta";
import { Rule } from "@/components/primitives/rule";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32">
        <Container>
          <Grid className="items-end">
            <div className="col-span-4 md:col-span-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="mono-label text-accent">§00</span>
                <span className="mono-label">INDEX / 2026 EDITION</span>
              </div>

              <h1 className="font-display text-balance text-[clamp(2.5rem,7.5vw,7.25rem)] text-fg">
                I build{" "}
                <span className="font-display-italic text-accent">
                  operational
                </span>{" "}
                software for businesses that can&rsquo;t afford downtime.
              </h1>

              <p className="mt-8 max-w-xl text-pretty text-base text-fg-soft md:text-lg">
                {site.subline}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-[12px] tracking-wide text-accent-fg transition-transform hover:-translate-y-0.5"
                >
                  See selected work
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↘</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-[12px] text-fg-soft underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
                >
                  {site.email}
                </a>
              </div>
            </div>

            {/* Hero status panel — the spec-sheet sidebar */}
            <aside className="col-span-4 md:col-span-4 md:col-start-9">
              <div className="rule-t rule-b grid grid-cols-2 gap-x-6 gap-y-6 py-6">
                <MonoMeta label="OPERATOR" value={site.fullName} />
                <MonoMeta label="ROLE" value={site.role} />
                <MonoMeta label="BASED" value={site.location} />
                <MonoMeta label="TIMEZONE" value="UTC+06 · Asia/Dhaka" />
                <MonoMeta label="STATUS" value={<MonoTag tone="ok">available — Q3</MonoTag>} />
                <MonoMeta label="STACK" value="ts · pg · hono · next" />
              </div>
              <p className="mt-3 font-mono text-[11px] text-faint">
                last updated · 2026.06.02
              </p>
            </aside>
          </Grid>
        </Container>
      </section>

      {/* ---------------- §01 WORK ---------------- */}
      <section id="work" className="relative py-16">
        <Container>
          <SectionMark index={1} label="WORK" hint="3 case studies" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {placeholderProjects.map((p) => (
              <PlaceholderTile key={p.slug} {...p} />
            ))}
          </div>
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

/* ---------------- placeholders ---------------- */

const placeholderProjects = [
  {
    slug: "bikalpo",
    index: "01",
    name: "Bikalpo",
    kind: "B2B Commerce",
    year: "2025—",
    stack: "Next.js · Drizzle · Better-Auth",
  },
  {
    slug: "bright-tutor",
    index: "02",
    name: "Bright Tutor",
    kind: "Multi-tenant SaaS",
    year: "2026",
    stack: "Turborepo · Hono · oRPC · Expo",
  },
  {
    slug: "stock-management",
    index: "03",
    name: "Stock Management",
    kind: "Internal Tooling",
    year: "2025—2026",
    stack: "Vite · TanStack · Zustand",
  },
] as const;

function PlaceholderTile({
  index,
  name,
  kind,
  year,
  stack,
}: (typeof placeholderProjects)[number]) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-line bg-bg-elev/40 p-6 transition-colors hover:border-line-strong">
      <div className="flex items-start justify-between">
        <span className="mono-label text-accent">№ {index}</span>
        <span className="mono-label">{year}</span>
      </div>
      <div className="mt-16 flex flex-col gap-3">
        <h3 className="font-display text-3xl text-fg">{name}</h3>
        <p className="mono-label">{kind}</p>
        <p className="font-mono text-[12px] text-fg-soft">{stack}</p>
      </div>
      <div className="absolute inset-x-6 bottom-6 flex items-center justify-between border-t border-line pt-4 opacity-60 transition-opacity group-hover:opacity-100">
        <span className="mono-label">CASE STUDY</span>
        <span className="font-mono text-[12px] text-fg-soft">soon ↗</span>
      </div>
    </article>
  );
}
