import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { featuredProjects, getProjectBySlug } from "@/lib/projects";
import { buildPageMetadata, caseStudyJsonLd } from "@/lib/seo";

import BikalpoContent from "@/content/work/bikalpo.mdx";
import BrightTutorContent from "@/content/work/bright-tutor.mdx";
import PadmaServiceContent from "@/content/work/padma-service.mdx";
import SelfShopContent from "@/content/work/selfshop.mdx";
import StockManagementContent from "@/content/work/stock-management.mdx";

const contentMap: Record<string, React.ComponentType> = {
  selfshop: SelfShopContent,
  bikalpo: BikalpoContent,
  "bright-tutor": BrightTutorContent,
  "stock-management": StockManagementContent,
  "padma-service": PadmaServiceContent,
};

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.name} — ${project.kind}`;

  return buildPageMetadata({
    title,
    description: project.description,
    path: `/work/${project.slug}`,
    ogType: "article",
    ogImage: project.image
      ? { url: project.image, alt: project.imageAlt ?? project.name }
      : undefined,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const Content = contentMap[slug];
  if (!project || !Content) notFound();

  return (
    <>
      <JsonLd data={caseStudyJsonLd(project)} />
      <CaseStudyLayout project={project}>
        <Content />
      </CaseStudyLayout>
    </>
  );
}
