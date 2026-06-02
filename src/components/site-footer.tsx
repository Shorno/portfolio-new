import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Rule } from "@/components/primitives/rule";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 pb-10">
      <Container>
        <Rule variant="ticked" />
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="mono-label">§ COLOPHON</span>
            <p className="max-w-md font-mono text-[12px] leading-relaxed text-muted">
              Set in Fraunces & Geist Mono. Built with Next.js{" "}
              <span className="text-fg-soft">16</span>, Tailwind{" "}
              <span className="text-fg-soft">v4</span> & Motion.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <span className="mono-label">© {year} / {site.fullName}</span>
            <div className="flex items-center gap-4 font-mono text-[12px] text-fg-soft">
              <Link
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent"
              >
                github↗
              </Link>
              <Link
                href={`mailto:${site.email}`}
                className="hover:text-accent"
              >
                email↗
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
