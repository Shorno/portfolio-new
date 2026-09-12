/** One hiring path, with the information a recruiter needs to get in touch. */
import Link from "next/link";
import { Container } from "@/components/primitives/container";
import { SectionMark } from "@/components/primitives/section-mark";
import { site } from "@/lib/site";

export function ContactSection() {
  return (
    <section id="contact" className="pb-16 md:pb-20">
      <Container>
        <SectionMark index={4} label="Contact" heading />
        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="max-w-xl text-xl leading-relaxed text-fg">{site.seeking.headline}.</p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-fg-soft">Send the role and a little about your team. I’ll reply within one working day.</p>
            <Link href={`mailto:${site.email}?subject=${encodeURIComponent(site.hireEmailSubject)}`} className="mt-5 inline-flex min-h-11 items-center break-all text-lg text-accent underline decoration-accent underline-offset-4">{site.email}</Link>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-base text-fg-soft">{site.location} · UTC+6</p>
            <p className="mt-2 text-sm text-muted">Open to remote roles</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <Link href={site.cvUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-fg underline decoration-line-strong underline-offset-4 hover:text-accent">View CV <span aria-hidden>↗</span></Link>
              <Link href={site.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-fg underline decoration-line-strong underline-offset-4 hover:text-accent">LinkedIn <span aria-hidden>↗</span></Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}