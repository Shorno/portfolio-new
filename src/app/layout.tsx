import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";

import { JsonLd } from "@/components/seo/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cloudinaryOgImageUrl } from "@/lib/cloudinary";
import {
  defaultOgImage,
  ogImageFromUrl,
  personJsonLd,
  webSiteJsonLd,
} from "@/lib/seo";
import { site } from "@/lib/site";

import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.seoDescription,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.seoDescription,
    images: ogImageFromUrl(defaultOgImage.url, defaultOgImage.alt),
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.seoDescription,
    images: [cloudinaryOgImageUrl(defaultOgImage.url)],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111316" },
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hanken.variable} ${bricolage.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-dvh bg-bg text-fg antialiased">
        <JsonLd data={[personJsonLd(), webSiteJsonLd()]} />
        <ThemeProvider>
          <div className="relative flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="relative flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
