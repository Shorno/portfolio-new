import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyLayout } from "@/components/case-study/case-study-layout";
import { featuredProjects, getProjectBySlug } from "@/lib/projects";
import { site } from "@/lib/site";

import BikalpoContent from "@/content/work/bikalpo.mdx";
import BrightTutorContent from "@/content/work/bright-tutor.mdx";
import StockManagementContent from "@/content/work/stock-management.mdx";

const contentMap: Record<string, React.ComponentType> = {
  bikalpo: BikalpoContent,
  "bright-tutor": BrightTutorContent,
  "stock-management": StockManagementContent,
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
  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
      url: `${site.url}/work/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
    },
  };
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
    <CaseStudyLayout project={project}>
      <Content />
    </CaseStudyLayout>
  );
}
