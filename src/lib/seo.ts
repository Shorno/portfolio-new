import type { Metadata } from "next";

import type { Project } from "@/lib/projects";
import {
  cloudinaryOgImageUrl,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
} from "@/lib/cloudinary";
import { site } from "@/lib/site";

/** Absolute URL on the live domain. */
export function absoluteUrl(path = ""): string {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Default share image for the homepage and fallback previews. */
export const defaultOgImage = {
  url: "https://res.cloudinary.com/def3zwztt/image/upload/v1780498340/Screenshot_2026-06-03_205020_igfxuv.png",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
  alt: "Shorno — full-stack engineer portfolio",
} as const;

export function ogImageFromUrl(
  url: string,
  alt: string,
): NonNullable<Metadata["openGraph"]>["images"] {
  return [
    {
      url: cloudinaryOgImageUrl(url),
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt,
    },
  ];
}

type PageMetadataInput = {
  title: string | { absolute: string };
  description: string;
  path: string;
  ogImage?: { url: string; alt: string };
  ogType?: "website" | "article";
};

/** Shared metadata shape for homepage and case studies. */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImage,
  ogType = "website",
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageList = ogImage
    ? ogImageFromUrl(ogImage.url, ogImage.alt)
    : ogImageFromUrl(defaultOgImage.url, defaultOgImage.alt);
  const twitterImages =
    imageList === undefined
      ? [cloudinaryOgImageUrl(defaultOgImage.url)]
      : (Array.isArray(imageList) ? imageList : [imageList]).map((img) => {
          if (typeof img === "string") return img;
          if (img instanceof URL) return img.toString();
          return img.url;
        });

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: ogType,
      locale: "en_US",
      url: canonical,
      siteName: site.name,
      title: typeof title === "string" ? title : title.absolute,
      description,
      images: imageList,
    },
    twitter: {
      card: "summary_large_image",
      title: typeof title === "string" ? title : title.absolute,
      description,
      images: twitterImages,
    },
  };
}

const personId = `${absoluteUrl("/")}#person`;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.fullName,
    givenName: "Shorno",
    familyName: "Roy",
    jobTitle: site.role,
    url: absoluteUrl("/"),
    email: `mailto:${site.email}`,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "BD",
    },
    sameAs: [site.github, site.linkedin, site.facebook],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: site.name,
    url: absoluteUrl("/"),
    description: site.seoDescription,
    author: { "@id": personId },
    inLanguage: "en",
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl("/")}#profile`,
    url: absoluteUrl("/"),
    name: `${site.fullName} — ${site.role}`,
    description: site.seoDescription,
    mainEntity: { "@id": personId },
    inLanguage: "en",
  };
}

export function homeJsonLd() {
  return [personJsonLd(), webSiteJsonLd(), profilePageJsonLd()];
}

export function creativeWorkJsonLd(project: Project) {
  const pageUrl = absoluteUrl(`/work/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#work`,
    name: project.name,
    headline: `${project.name} — ${project.kind}`,
    description: project.description,
    url: pageUrl,
    ...(project.image
      ? { image: project.image, thumbnailUrl: project.image }
      : {}),
    author: { "@id": personId },
    creator: { "@id": personId },
    inLanguage: "en",
    keywords: project.stack.join(", "),
    ...(project.url ? { isBasedOn: project.url } : {}),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function caseStudyJsonLd(project: Project) {
  return [
    creativeWorkJsonLd(project),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Work", path: "/#work" },
      { name: project.name, path: `/work/${project.slug}` },
    ]),
  ];
}
