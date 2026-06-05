import Link from "next/link";

import { Container } from "@/components/primitives/container";
import { Grid } from "@/components/primitives/grid";
import { MonoMeta, MonoTag } from "@/components/primitives/mono-meta";
import { site } from "@/lib/site";
import { deriveStatus, getLatestPush, timeAgo } from "@/lib/github";

import { BlueprintGrid } from "./blueprint-grid";
import { LiveClock } from "./live-clock";

/**
 * Editorial hero — serif headline + spec-sheet status panel.
 * Server component: pulls latest GitHub push activity (cached 10m) and
 * feeds it into the live status row.
 */
export async function Hero() {
  const latest = await getLatestPush();
  const status = deriveStatus(latest);
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, ".");

  return (
    <section className="relative isolate overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <BlueprintGrid />

      <Container className="relative z-10">
        <Grid className="items-end">
          {/* ---------- Headline column ---------- */}
          <div className="col-span-4 md:col-span-8">
            <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="mono-label text-accent">§00</span>
              <span className="mono-label">INDEX / 2026 EDITION</span>
              {latest ? (
                <>
                  <span className="mono-label text-faint">·</span>
                  <span className="mono-label">
                    <span className="text-faint">last commit:&nbsp;</span>
                    <Link
                      href={latest.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-fg-soft underline decoration-line decoration-1 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {latest.name}
                    </Link>
                    <span className="text-faint">
                      &nbsp;· {timeAgo(latest.pushedAt)}
                    </span>
                  </span>
                </>
              ) : null}
            </div>

            <h1 className="font-display text-balance text-[clamp(2.75rem,7.8vw,7.5rem)] text-fg">
              {site.tagline.lead}
              <span className="font-display-italic text-accent">
                {site.tagline.accent}
              </span>
              {site.tagline.tail}
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-base text-fg-soft md:text-lg">
              {site.subline}
            </p>

            {site.seeking.open ? (
              <p className="mt-5 max-w-xl font-mono text-[12px] leading-relaxed tracking-tight text-fg-soft">
                {site.seeking.strip}
              </p>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
              <Link
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-[12px] tracking-wide text-accent-fg transition-transform hover:-translate-y-0.5"
              >
                See selected work
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  ↘
                </span>
              </Link>
              {site.seeking.open ? (
                <Link
                  href={`mailto:${site.email}?subject=${encodeURIComponent(site.hireEmailSubject)}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev/40 px-5 py-2.5 font-mono text-[12px] tracking-wide text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  Discuss a role
                  <span
                    aria-hidden
                    className="text-faint transition-colors group-hover:text-accent"
                  >
                    ↗
                  </span>
                </Link>
              ) : null}
              <Link
                href={site.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev/40 px-5 py-2.5 font-mono text-[12px] tracking-wide text-fg transition-colors hover:border-accent hover:text-accent"
              >
                View CV
                <span
                  aria-hidden
                  className="text-faint transition-colors group-hover:text-accent"
                >
                  ↗
                </span>
              </Link>
              <Link
                href={`mailto:${site.email}`}
                className="ml-2 font-mono text-[12px] text-fg-soft underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
              >
                {site.email}
              </Link>
            </div>
          </div>

          {/* ---------- Spec-sheet status panel ---------- */}
          <aside className="col-span-4 md:col-span-4 md:col-start-9">
            <div className="rule-t rule-b grid grid-cols-2 gap-x-6 gap-y-6 py-6">
              <MonoMeta label="OPERATOR" value={site.fullName} />
              <MonoMeta label="ROLE" value={site.role} />
              <MonoMeta label="BASED" value={site.location} />
              <MonoMeta
                label="LOCAL TIME"
                value={
                  <span className="inline-flex items-baseline gap-1.5">
                    <LiveClock />
                    <span className="text-faint">UTC+6</span>
                  </span>
                }
              />
              <MonoMeta
                label="STATUS"
                value={<MonoTag tone={status.tone}>{status.label}</MonoTag>}
              />
              <MonoMeta
                label="LAST PUSH"
                value={
                  latest ? (
                    <Link
                      href={latest.url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-line decoration-1 underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
                    >
                      {latest.name}
                      <span className="text-faint">
                        {" "}
                        · {timeAgo(latest.pushedAt)}
                      </span>
                    </Link>
                  ) : (
                    "—"
                  )
                }
              />
            </div>
            <p className="mt-3 flex items-center justify-between font-mono text-[11px] text-faint">
              <span>system check · {today}</span>
              <span>v0.1.0</span>
            </p>
          </aside>
        </Grid>
      </Container>
    </section>
  );
}
