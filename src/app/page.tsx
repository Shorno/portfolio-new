/** Homepage: opening letter, selected work, experience and skills, contact. */
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/hero/hero";
import { WorkSection } from "@/components/work/work-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { ContactSection } from "@/components/contact/contact-section";
import { buildPageMetadata, profilePageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: `${site.fullName} – Full-stack Developer` },
  description: site.seoDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <Hero />
      <WorkSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
