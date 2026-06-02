import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { SectionMark } from "@/components/primitives/section-mark";
import { Rule } from "@/components/primitives/rule";
import { systemStack } from "@/lib/system";

/**
 * §02 SYSTEM — the actual toolkit, grouped editorial-spec-sheet style.
 * Four groups (A/B/C/D), each with named items and a short "role" line.
 */
export function SystemSection() {
  return (
    <section id="system" className="relative py-20 md:py-28">
      <Container>
        <SectionMark index={2} label="SYSTEM" hint="tools of trade" />

        <Grid className="mt-14">
          <div className="col-span-4 md:col-span-5">
            <h2 className="font-display text-balance text-4xl text-fg md:text-6xl">
              A small,{" "}
              <span className="font-display-italic text-accent">sharp</span>{" "}
              toolkit.
            </h2>
            <p className="mt-6 max-w-md text-pretty text-fg-soft md:text-lg md:leading-relaxed">
              I pick boring, fast tools and obsess over the parts users
              actually touch. Each one earns its place by being either
              irreplaceable or invisible.
            </p>
            <p className="mt-6 max-w-md font-mono text-[12.5px] text-faint">
              The full spec, not the curated highlight reel.
            </p>
          </div>

          <div className="col-span-4 md:col-span-7 md:col-start-6">
            <Rule variant="ticked" />
            <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
              {systemStack.map((group) => (
                <SystemGroup key={group.label} group={group} />
              ))}
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  );
}

function SystemGroup({ group }: { group: (typeof systemStack)[number] }) {
  return (
    <div className="group flex flex-col gap-5">
      <div className="flex items-baseline gap-3 border-b border-line pb-2">
        <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
          {group.index}
        </span>
        <span className="mono-label text-fg-soft">{group.label}</span>
      </div>
      <ul className="flex flex-col gap-4">
        {group.items.map((it) => (
          <li
            key={it.name}
            className="grid grid-cols-[1fr_auto] items-baseline gap-x-3"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[13.5px] text-fg">{it.name}</span>
              <span className="text-[13px] leading-relaxed text-fg-soft">
                {it.role}
              </span>
            </div>
            {it.since ? (
              <span className="mono-label text-faint">since {it.since}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
