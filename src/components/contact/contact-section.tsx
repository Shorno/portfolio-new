/** Closing call to action: an ink card with the email address and the two other ways to reach out. */
import { ButtonLink } from "@/components/primitives/button-link";
import { Container } from "@/components/primitives/container";
import { site } from "@/lib/site";

export function ContactSection() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(site.hireEmailSubject)}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="pt-16 md:pt-20">
      <Container>
        <div className="relative grid items-end gap-8 overflow-hidden rounded-[1.75rem] bg-ink px-6 py-9 text-ink-fg md:grid-cols-[1.3fr_1fr] md:gap-10 md:rounded-[2.25rem] md:p-16">
          <span aria-hidden className="absolute -top-24 -right-16 size-64 rounded-[42%_58%_61%_39%/45%_39%_61%_55%] bg-accent opacity-55" />
          <span aria-hidden className="absolute -top-16 right-36 size-36 rounded-full bg-tint-sand opacity-35" />
          <div className="relative">
            <h2 id="contact-title" className="font-display text-[clamp(2.2rem,4.2vw,3.6rem)]">Let{"’"}s work together.</h2>
            <p className="mt-4 max-w-[46ch] opacity-75">
              I{"’"}m open to full-stack developer roles: remote, on-site or hybrid. Send me a message and I{"’"}ll reply within one working day.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-2.5 md:justify-end">
            <ButtonLink variant="inverse" arrow href={mailto}>{site.email}</ButtonLink>
            <ButtonLink variant="ghost-inverse" href={site.cvUrl} target="_blank" rel="noreferrer">Resume</ButtonLink>
            <ButtonLink variant="ghost-inverse" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
