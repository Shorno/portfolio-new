/**
 * Closing call to action: an ink card where the email address itself is
 * the headline-sized link, with the resume and LinkedIn beside it.
 */
import { Arrow } from "@/components/primitives/arrow";
import { ButtonLink } from "@/components/primitives/button-link";
import { Container } from "@/components/primitives/container";
import { site } from "@/lib/site";

export function ContactSection() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(site.hireEmailSubject)}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-16 md:pt-20">
      <Container>
        <div className="rounded-[1.75rem] bg-ink px-6 py-9 text-ink-fg md:rounded-[2.25rem] md:px-14 md:py-14">
          <h2 id="contact-title" className="font-display text-[1.875rem]">Get in touch</h2>
          <p className="mt-2 max-w-[52ch] text-ink-fg/75">
            I{"’"}m open to full-stack roles, remote, on-site or hybrid. Email is the quickest way to reach me.
          </p>
          <a
            href={mailto}
            className="group/mail mt-8 inline-flex max-w-full items-center gap-3 font-display text-[clamp(1.6rem,5.2vw,3.4rem)] break-all text-ink-fg underline decoration-ink-fg/25 decoration-2 underline-offset-[0.18em] transition-[text-decoration-color] duration-200 hover:decoration-ink-fg sm:break-normal"
          >
            {site.email}
            <Arrow className="size-[0.45em] shrink-0 transition-transform duration-200 ease-out group-hover/mail:translate-x-1 group-hover/mail:-translate-y-1" />
          </a>
          <div className="mt-8 flex flex-wrap gap-2.5 border-t border-ink-fg/15 pt-6">
            <ButtonLink variant="inverse" size="sm" href={site.cvUrl} target="_blank" rel="noreferrer">Resume (PDF)</ButtonLink>
            <ButtonLink variant="ghost-inverse" size="sm" arrow href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
