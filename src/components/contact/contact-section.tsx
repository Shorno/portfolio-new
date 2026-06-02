import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { SectionMark } from "@/components/primitives/section-mark";
import { MonoMeta, MonoTag } from "@/components/primitives/mono-meta";
import { Rule } from "@/components/primitives/rule";
import { LiveClock } from "@/components/hero/live-clock";
import { site } from "@/lib/site";

const statusCopy = {
  available: {
    tone: "ok" as const,
    label: "AVAILABLE — TAKING NEW WORK",
    detail:
      "I have capacity for one new client engagement. Best for projects that ship something real in 6\u201312 weeks.",
  },
  limited: {
    tone: "warn" as const,
    label: "LIMITED CAPACITY",
    detail:
      "Mostly booked. Open to short engagements or consulting calls \u2014 get in touch and we\u2019ll see.",
  },
  booked: {
    tone: "warn" as const,
    label: "BOOKED THROUGH NEXT QUARTER",
    detail:
      "Currently focused on existing client work. Happy to talk and queue something for later.",
  },
};

/**
 * §04 CONTACT — availability rail, location, write-to-me CTA, what-to-send copy.
 * Server component; pulls status/email/location from src/lib/site.ts.
 */
export function ContactSection() {
  const status = statusCopy[site.status];
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <Container>
        <SectionMark index={5} label="CONTACT" hint="one line is fine" />

        {/* Headline */}
        <div className="mt-12 max-w-4xl">
          <p className="font-display text-balance text-[clamp(2.25rem,6vw,6rem)] text-fg">
            Got something{" "}
            <span className="font-display-italic text-accent">serious</span>{" "}
            to build?
          </p>
          <p className="mt-6 max-w-xl text-pretty text-fg-soft md:text-lg md:leading-relaxed">
            One line about the problem is enough. I&rsquo;ll reply within 24h
            on a working day, usually same-day from Dhaka hours.
          </p>
        </div>

        {/* Email CTA */}
        <div className="mt-12 inline-block">
          <Link
            href={`mailto:${site.email}?subject=Project%20inquiry`}
            className="group/cta block rounded-full bg-fg px-7 py-4 transition-transform hover:-translate-y-0.5"
          >
            <span className="mono-label mr-3 text-bg/60">WRITE↗</span>
            <span className="font-mono text-lg text-bg md:text-xl">
              {site.email}
            </span>
          </Link>
        </div>

        {/* Spec rail */}
        <Rule variant="ticked" className="mt-16" />
        <Grid className="mt-8 items-start gap-y-10">
          <div className="col-span-4 md:col-span-4">
            <MonoMeta
              label="AVAILABILITY"
              value={<MonoTag tone={status.tone}>{status.label}</MonoTag>}
            />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-fg-soft">
              {status.detail}
            </p>
          </div>

          <div className="col-span-4 md:col-span-4">
            <MonoMeta
              label="LOCATION"
              value={
                <>
                  {site.location}
                  <br />
                  <span className="text-faint">{site.timezone}</span>
                </>
              }
            />
            <div className="mt-4 max-w-xs text-[14px] leading-relaxed text-fg-soft">
              Currently{" "}
              <LiveClock className="font-mono text-fg" />, working hours
              roughly 10:00–19:00 UTC+6. Calls outside that — happy to.
            </div>
          </div>

          <div className="col-span-4 md:col-span-4">
            <MonoMeta
              label="ELSEWHERE"
              value={
                <ul className="flex flex-col gap-1.5">
                  <li>
                    <SocialLink href={site.github}>github</SocialLink>
                  </li>
                  <li>
                    <SocialLink href={`mailto:${site.email}`}>email</SocialLink>
                  </li>
                  <li>
                    <span className="text-faint">linkedin · soon</span>
                  </li>
                </ul>
              }
            />
          </div>
        </Grid>

        {/* What to send */}
        <Rule variant="ticked" className="mt-16" />
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="mono-label">WHAT TO SEND</span>
          </div>
          <div className="md:col-span-9">
            <ul className="grid grid-cols-1 gap-y-5 text-[15.5px] leading-relaxed text-fg-soft md:grid-cols-2 md:gap-x-10">
              {whatToSend.map((it) => (
                <li
                  key={it.heading}
                  className="relative pl-6 before:absolute before:top-3 before:left-0 before:h-px before:w-3 before:bg-accent"
                >
                  <strong className="font-mono text-[12.5px] text-fg uppercase tracking-wide">
                    {it.heading}
                  </strong>
                  <span className="mt-1.5 block">{it.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function SocialLink({ href, children }: { href: string; children: string }) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group/social inline-flex items-baseline gap-2 text-fg-soft transition-colors hover:text-accent"
    >
      <span className="font-mono text-[13px] text-fg group-hover/social:text-accent">
        {children}
      </span>
      <span aria-hidden className="text-faint">
        ↗
      </span>
    </Link>
  );
}

const whatToSend: Array<{ heading: string; body: string }> = [
  {
    heading: "What you're building",
    body: "A quick paragraph. What the product is, who uses it, what's not working right now.",
  },
  {
    heading: "Where you're at",
    body: "Starting fresh, halfway built, or a rewrite. Just say which.",
  },
  {
    heading: "Timeline & budget",
    body: "A rough range is fine. Lets me say yes or no quickly.",
  },
  {
    heading: "Anything ruled out",
    body: "Already decided against a stack, vendor, or hosting? Tell me upfront.",
  },
];
