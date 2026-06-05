import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { SectionMark } from "@/components/primitives/section-mark";
import { MonoMeta, MonoTag } from "@/components/primitives/mono-meta";
import { Rule } from "@/components/primitives/rule";
import { LiveClock } from "@/components/hero/live-clock";
import { site } from "@/lib/site";

const clientStatusCopy = {
  available: {
    tone: "ok" as const,
    label: "AVAILABLE",
    detail:
      "Capacity for one new client engagement. Best for projects that ship something real in 6\u201312 weeks.",
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
 * §05 CONTACT — dual hiring + client paths, availability rails, what-to-send copy.
 * Server component; pulls status/email/location from src/lib/site.ts.
 */
export function ContactSection() {
  const clientStatus = clientStatusCopy[site.status];
  const hireMailto = `mailto:${site.email}?subject=${encodeURIComponent(site.hireEmailSubject)}`;
  const projectMailto = `mailto:${site.email}?subject=${encodeURIComponent(site.projectEmailSubject)}`;

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <Container>
        <SectionMark index={5} label="CONTACT" hint="one line is fine" />

        {/* Headline */}
        <div className="mt-12 max-w-4xl">
          <p className="font-display text-balance text-[clamp(2.25rem,6vw,6rem)] text-fg">
            Hiring, or got something{" "}
            <span className="font-display-italic text-accent">serious</span>{" "}
            to build?
          </p>
          <p className="mt-6 max-w-xl text-pretty text-fg-soft md:text-lg md:leading-relaxed">
            One line about the role or the problem is enough. I&rsquo;ll reply
            within 24h on a working day, usually same-day from Dhaka hours.
          </p>
        </div>

        {/* Dual CTAs */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          {site.seeking.open ? (
            <Link
              href={hireMailto}
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-[12px] tracking-wide text-accent-fg transition-transform hover:-translate-y-0.5"
            >
              Discuss a role
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </Link>
          ) : null}
          <Link
            href={projectMailto}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev/40 px-6 py-3.5 font-mono text-[12px] tracking-wide text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Project inquiry
            <span
              aria-hidden
              className="text-faint transition-colors group-hover:text-accent"
            >
              ↗
            </span>
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className="font-mono text-[12px] text-fg-soft underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
          >
            {site.email}
          </Link>
        </div>

        {/* Spec rail */}
        <Rule variant="ticked" className="mt-16" />
        <Grid className="mt-8 items-start gap-y-10">
          {site.seeking.open ? (
            <div className="col-span-4 md:col-span-4">
              <MonoMeta
                label="HIRING"
                value={
                  <MonoTag tone="ok">{site.seeking.hiringLabel}</MonoTag>
                }
              />
              <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-fg-soft">
                {site.seeking.hiringDetail}
              </p>
              <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-faint">
                {site.seeking.graduationNote}
              </p>
            </div>
          ) : null}

          <div className="col-span-4 md:col-span-4">
            <MonoMeta
              label="CLIENT WORK"
              value={
                <MonoTag tone={clientStatus.tone}>
                  {clientStatus.label}
                </MonoTag>
              }
            />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-fg-soft">
              {clientStatus.detail}
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
              roughly 10:00–19:00 UTC+6. Calls outside that are fine too.
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
                    <SocialLink href={site.linkedin}>linkedin</SocialLink>
                  </li>
                  <li>
                    <SocialLink href={site.facebook}>facebook</SocialLink>
                  </li>
                  <li>
                    <SocialLink href={`mailto:${site.email}`}>email</SocialLink>
                  </li>
                  <li>
                    <SocialLink href={`tel:${site.phone}`}>
                      {site.phone.replace(/(\+880)(\d{4})(\d+)/, "$1 $2 $3")}
                    </SocialLink>
                  </li>
                </ul>
              }
            />
          </div>
        </Grid>

        {/* What to send — hiring */}
        {site.seeking.open ? (
          <>
            <Rule variant="ticked" className="mt-16" />
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-3">
                <span className="mono-label">FOR HIRING</span>
              </div>
              <div className="md:col-span-9">
                <ul className="grid grid-cols-1 gap-y-5 text-[15.5px] leading-relaxed text-fg-soft md:grid-cols-2 md:gap-x-10">
                  {whatToSendHiring.map((it) => (
                    <ChecklistItem key={it.heading} {...it} />
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : null}

        {/* What to send — client */}
        <Rule variant="ticked" className="mt-16" />
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="mono-label">FOR PROJECTS</span>
          </div>
          <div className="md:col-span-9">
            <ul className="grid grid-cols-1 gap-y-5 text-[15.5px] leading-relaxed text-fg-soft md:grid-cols-2 md:gap-x-10">
              {whatToSendClient.map((it) => (
                <ChecklistItem key={it.heading} {...it} />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ChecklistItem({ heading, body }: { heading: string; body: string }) {
  return (
    <li className="relative pl-6 before:absolute before:top-3 before:left-0 before:h-px before:w-3 before:bg-accent">
      <strong className="font-mono text-[12.5px] text-fg uppercase tracking-wide">
        {heading}
      </strong>
      <span className="mt-1.5 block">{body}</span>
    </li>
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

const whatToSendHiring: Array<{ heading: string; body: string }> = [
  {
    heading: "Role title",
    body: "What you\u2019re hiring for. Junior full-stack, frontend, internship, etc.",
  },
  {
    heading: "Stack & team",
    body: "Primary tech and how the team is shaped. Helps me gauge fit fast.",
  },
  {
    heading: "Employment type",
    body: "Full-time, part-time, contract, remote, or on-site in Dhaka.",
  },
  {
    heading: "Timeline",
    body: "When you\u2019d want someone to start, and what the interview process looks like.",
  },
];

const whatToSendClient: Array<{ heading: string; body: string }> = [
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
