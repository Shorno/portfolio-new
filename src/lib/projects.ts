/**
 * Project / case study data model.
 *
 * Featured projects are surfaced in §01 WORK with the scroll-stacked
 * interaction. Each one will also get a full /work/[slug] case study page
 * in Phase 3. `metrics`, `seed`, and `palette` feed the generative
 * placeholder art until real screenshots are dropped into `image`.
 */

export type ProjectStatus =
  | "live"
  | "partial-live"
  | "private-client"
  | "in-development";

export type Project = {
  slug: string;
  /** Display index, e.g. "01" */
  index: string;
  name: string;
  /** Short category descriptor, e.g. "B2B Commerce" */
  kind: string;
  /** Display year on the work card, e.g. "2026—present" or "2025—2026" */
  year: string;
  status: ProjectStatus;
  /** One-line editorial pitch for the card */
  tagline: string;
  /** 2–3 sentence summary used on the case study page hero */
  description: string;
  /** Live deploy URL, if public */
  url?: string;
  /** GitHub repo URL, if public */
  github?: string;
  /** Google Play Store listing URL, when the project has a publicly listed native app. */
  playstore?: string;
  /** Tech stack pills, ordered by prominence */
  stack: string[];
  /** Short fact chips for the work card — plain labels + values a non-dev can scan. */
  metrics: Array<{ label: string; value: string }>;
  /** Hero image path. Falls back to generative art when absent. */
  image?: string;
  imageAlt?: string;
  /** Stable seed for the generative placeholder so each project looks distinct */
  seed: number;
  /** Accent variant for the generative art */
  art: "grid" | "wires" | "blueprint";
};

export const featuredProjects: Project[] = [
  {
    slug: "selfshop",
    index: "01",
    name: "SelfShop",
    kind: "Reseller & Dropshipping Commerce",
    year: "2026—present",
    status: "live",
    tagline:
      "Three roles, three surfaces. Admin, reseller, and supplier dashboards on the web, plus the reseller app on Play Store. I plugged into the team's Laravel API.",
    description:
      "Multi-role reseller marketplace. I built the admin, reseller, and supplier dashboards in the Next.js client app, plus the React Native + Tamagui reseller app on Google Play. The Laravel backend was the team's. This case study covers the front of house.",
    url: "https://selfshop.com.bd/",
    playstore:
      "https://play.google.com/store/apps/details?id=com.selfshop.reseller&hl=en",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780454810/Screenshot_2026-06-03_084636_adaai5.png",
    imageAlt: "SelfShop — reseller product and dashboard view",
    github: undefined,
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Ant Design",
      "Redux Toolkit",
      "NextAuth",
      "React Native · Expo",
      "Tamagui",
      "Pusher · Laravel Echo",
      "Laravel API (consumed)",
    ],
    metrics: [
      { label: "builds", value: "web + mobile · 3 surfaces" },
      { label: "roles", value: "admin · reseller · supplier" },
      { label: "status", value: "live · Play Store" },
    ],
    seed: 91,
    art: "wires",
  },
  {
    slug: "bikalpo",
    index: "02",
    name: "Bikalpo",
    kind: "Multi-Party Commerce Marketplace",
    year: "2025—present",
    status: "partial-live",
    tagline:
      "Four participant tiers, one catalog. Partial surfaces live on b2b.bikalpo.com. The full platform is still under build.",
    description:
      "Multi-party commerce for a Bangladeshi distributor: platform admin, warehouse/wholesaler, two retailer tiers (resell-and-buy and buy-only), and a consumer storefront on one catalog with tier-aware pricing. Partial work is live on b2b.bikalpo.com. The full platform and Turborepo rewrite (web, mobile, Hono API) are in active development.",
    url: "https://b2b.bikalpo.com/",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456221/Create-Next-App_zngg7r.png",
    imageAlt: "Bikalpo — B2B storefront on b2b.bikalpo.com",
    github: "https://github.com/Shorno/bikalpo-project",
    stack: [
      "Next.js 16",
      "React 19",
      "Drizzle ORM",
      "Postgres",
      "Better-Auth",
      "TanStack Query",
      "Lexical",
      "Cloudinary",
    ],
    metrics: [
      { label: "status", value: "part live · in dev" },
      { label: "live at", value: "b2b.bikalpo.com" },
      { label: "target", value: "web + mobile + API" },
    ],
    seed: 17,
    art: "grid",
  },
  {
    slug: "bright-tutor",
    index: "03",
    name: "Bright Tutor",
    kind: "Multi-Role Education Platform",
    year: "2026",
    status: "live",
    tagline:
      "Six surfaces, one schema. Teachers, guardians, and admins each get web and native, off the spreadsheet.",
    description:
      "Tuition media platform for a tutoring business: public marketplace, admin console, and role-aware web + native surfaces for teachers and guardians, all on one Hono+oRPC API with a shared Drizzle schema.",
    url: "https://brighteducations.com/",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456307/Bright-Tutor-Find-Verified-Tutors-in-Bangladesh_argy0s.png",
    imageAlt: "Bright Tutor — marketing site on brighteducations.com",
    github: undefined,
    stack: [
      "Turborepo",
      "Hono",
      "oRPC",
      "Next.js",
      "Expo / React Native",
      "Drizzle ORM",
      "Postgres",
      "Better-Auth",
    ],
    metrics: [
      { label: "builds", value: "web + mobile · 6 apps" },
      { label: "roles", value: "teacher · guardian · admin" },
      { label: "status", value: "live" },
    ],
    seed: 41,
    art: "wires",
  },
  {
    slug: "stock-management",
    index: "04",
    name: "Stock Management",
    kind: "Distributor Operations SPA",
    year: "2025—2026",
    status: "live",
    tagline:
      "Procurement to retailer fulfillment in one React SPA. Stock in, stock out, invoices. The full daily flow.",
    description:
      "Distributor operational tool for receiving stock from suppliers, selling to retailers and proprietors, transfers, returns, and printed invoices. Built around how wholesale actually moves. Separate Vite + React 19 SPA and backend repos, both deployed.",
    url: "https://mstamimenterprise.shop/",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456379/stock-management_tbbhr6.png",
    imageAlt: "Stock Management — distributor operations dashboard",
    github: "https://github.com/Shorno/stock-management",
    stack: [
      "Vite",
      "React 19",
      "TanStack Query",
      "TanStack Table",
      "Zustand",
      "react-pdf",
      "Tailwind v4",
      "Better-Auth",
    ],
    metrics: [
      { label: "builds", value: "wholesale web app" },
      { label: "flow", value: "stock in → invoice out" },
      { label: "status", value: "live" },
    ],
    seed: 73,
    art: "blueprint",
  },
  {
    slug: "padma-service",
    index: "05",
    name: "Padma Service",
    kind: "Services Marketplace & CMS",
    year: "2025—2026",
    status: "live",
    tagline:
      "A bilingual services catalog where the marketing site, member dashboard, and admin CMS all run on one typed oRPC contract.",
    description:
      "Full-stack platform for Padma Service Company: public service catalog with categories and blogs, phone-OTP member accounts, and an admin console for banners, homepage sections, and user-submitted listings through an approval queue. Next.js 16 storefront plus a Hono API on Bun, Postgres via Drizzle.",
    url: "https://padmaservice.com",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456472/%E0%A6%AA%E0%A6%A6%E0%A7%8D%E0%A6%AE%E0%A6%BE-%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AD%E0%A6%BF%E0%A6%B8-%E0%A6%95%E0%A7%8B%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BF_sntyg5.png",
    imageAlt: "Padma Service — public homepage (Bengali)",
    github: undefined,
    stack: [
      "Next.js 16",
      "React 19",
      "Hono",
      "oRPC",
      "Drizzle ORM",
      "Postgres",
      "Better-Auth",
      "TipTap",
      "Cloudinary",
      "shadcn/ui",
    ],
    metrics: [
      { label: "builds", value: "site + admin CMS" },
      { label: "perf", value: "SSG + RSC · Next.js 16" },
      { label: "status", value: "live" },
    ],
    seed: 58,
    art: "grid",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return featuredProjects.find((p) => p.slug === slug);
}
