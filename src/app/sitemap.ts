import type { MetadataRoute } from "next";

import { featuredProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...featuredProjects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl("/archive"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.3,
    },
  ];
}
