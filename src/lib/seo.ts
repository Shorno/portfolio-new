import type { Metadata } from "next";

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
  /** 1200x630, rendered from design-previews/og-image.html. */
  url: "/og.png",
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
  alt: "Shorno Kamal Roy, full-stack engineer building web and mobile apps. Dhaka, Bangladesh. shorno.dev",
} as const;

export function ogImageFromUrl(
  url: string,
  alt: string,
): NonNullable<Metadata["openGraph"]>["images"] {
  return [
    {
      url: new URL(cloudinaryOgImageUrl(url), site.url).toString(),
      ...(url.includes("res.cloudinary.com") || url === defaultOgImage.url
        ? { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT }
        : {}),
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

/** Shared metadata shape for the homepage and archive. */
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

const knowsAbout = [
  "Next.js",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Node.js",
  "React Native",
  "Full-stack web development",
  "MongoDB",
  "Tailwind CSS",
] as const;

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
    knowsAbout: [...knowsAbout],
    ...(site.seeking.open
      ? {
          seeks: site.seeking.roles.map((name) => ({
            "@type": "Demand",
            name,
          })),
        }
      : {}),
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
