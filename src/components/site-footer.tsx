import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { Rule } from "@/components/primitives/rule";
import { site } from "@/lib/site";

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="hover:text-accent"
    >
      {children}
    </Link>
  );
}

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
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[12px] text-fg-soft">
              <FooterLink href={site.github} external>
                github↗
              </FooterLink>
              <FooterLink href={site.linkedin} external>
                linkedin↗
              </FooterLink>
              <FooterLink href={site.facebook} external>
                facebook↗
              </FooterLink>
              <FooterLink href={`mailto:${site.email}`}>email↗</FooterLink>
              <FooterLink href={`tel:${site.phone}`}>phone↗</FooterLink>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
