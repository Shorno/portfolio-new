/**
 * Project records for the homepage "Featured projects" section.
 *
 * Featured projects render as split cards (details left, screenshot in a
 * tinted frame right); the rest render as "More projects" preview cards
 * with the screenshot behind the details. Keep "More projects" newest first.
 *
 * Invariant: `team` and `results` hold only values the owner has
 * confirmed. Results are omitted, never shown as a placeholder.
 */

export type ProjectStatus = "live" | "partial-live";
export type ProjectTint = "mint" | "sand" | "sky" | "lilac";

export type Project = {
  slug: string;
  name: string;
  /** Large split card, or a compact card under "More projects". */
  featured: boolean;
  /** What the product is and who uses it, in plain words. */
  summary: string;
  /** Who it was built for, shown in the meta line under the name, e.g. "Ecube". */
  client?: string;
  /** Who built it, owner-confirmed, e.g. "Solo" or "Lead developer, team of three". Team projects always lead with the owner's lead role. */
  team: string;
  /** What I built, or the core features, in one line. */
  built: string;
  /** Display year(s), e.g. "2026" or "2025–2026". */
  year: string;
  status: ProjectStatus;
  /** Main technologies, most important first. */
  stack: string[];
  /** Checkable outcomes, owner-confirmed only. */
  results?: string[];
  url?: string;
  /** Only for public repositories. */
  github?: string;
  playstore?: string;
  image: string;
  imageAlt: string;
  /** Background tint of the screenshot frame. */
  tint: ProjectTint;
};

export const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  "partial-live": "Partly live",
};

export const projects: Project[] = [
  {
    slug: "bright-educations",
    name: "Bright Educations",
    featured: true,
    summary:
      "Tutoring platform in Bangladesh that connects guardians with verified tutors. Web and mobile apps for guardians, tutors and admins.",
    team: "Lead developer, team of three",
    built: "Web and mobile apps",
    year: "2026",
    status: "live",
    stack: ["Next.js", "Expo", "Hono", "PostgreSQL"],
    results: ["About 5,000 active users"],
    url: "https://brighteducations.com/",
    image: "/work/bright-educations/web-home.png",
    imageAlt: "Bright Educations homepage: Find the right tutor for your child",
    tint: "lilac",
  },
  {
    slug: "ecube-tournament",
    name: "Ecube Tournament",
    featured: true,
    summary:
      "Ecube’s esports tournament site: squads register, follow the schedule and play for the prize pool. Group draws, result checks and team chat, in English and Bangla.",
    client: "Ecube",
    team: "Solo",
    built: "Web app, API and database, with real-time team chat and live result updates",
    year: "2026",
    status: "live",
    stack: ["Next.js", "TypeScript", "Hono", "PostgreSQL", "Socket.IO"],
    results: ["About 15,000 teams registered", "Hosts tournaments with a BDT 10,00,000 prize pool"],
    url: "https://tour.ecube.gg/",
    image: "/work/ecube-tournament/web-home.jpg",
    imageAlt: "Ecube Tournament homepage for Return of King: Free Fire",
    tint: "mint",
  },
  {
    slug: "selfshop",
    name: "SelfShop",
    featured: true,
    summary:
      "Reseller marketplace where suppliers list products and resellers sell them through their own channels, on the web and Android.",
    client: "AlgoVerse client",
    team: "Lead developer, team of three; I now maintain it alone",
    built: "Admin, reseller and supplier dashboards, and the reseller Android app on Google Play",
    year: "2026",
    status: "live",
    stack: ["Next.js", "React Native", "TypeScript", "Redux Toolkit"],
    results: ["15,000+ monthly active users"],
    url: "https://selfshop.com.bd/",
    playstore:
      "https://play.google.com/store/apps/details?id=com.selfshop.reseller&hl=en",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780454810/Screenshot_2026-06-03_084636_adaai5.png",
    imageAlt: "SelfShop reseller product and dashboard view",
    tint: "sand",
  },
  {
    slug: "stock-management",
    name: "Stock Management",
    featured: true,
    summary:
      "Inventory and sales system that replaced a wholesale distributor’s spreadsheets.",
    client: "Wholesale distributor",
    team: "Solo, end to end",
    built:
      "Sales and stock tracking, sales-rep (SR and DSR) tracking, customer dues, printed invoices and automated SMS",
    year: "2025–2026",
    status: "live",
    stack: ["React", "TypeScript", "TanStack Query", "Vite"],
    url: "https://mstamimenterprise.shop/",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456379/stock-management_tbbhr6.png",
    imageAlt: "Stock Management distributor dashboard",
    tint: "sky",
  },
  {
    slug: "ecube-esports",
    name: "Ecube Esports",
    featured: false,
    summary:
      "Tournaments, teams, players and rankings from Bangladesh’s PUBG Mobile scene.",
    client: "Ecube",
    team: "Solo",
    built: "Match replays on the map, live standings, and player pages with playstyle and hit maps",
    year: "2026",
    status: "live",
    stack: ["Next.js", "Hono", "oRPC", "PostgreSQL", "Drizzle"],
    url: "https://esports.ecube.gg/pubgm",
    image: "/work/ecube-esports/web-home.png",
    imageAlt: "Ecube Esports PUBG Mobile page with match replay maps and tournaments in progress",
    tint: "mint",
  },
  {
    slug: "the-esports-times",
    name: "The Esports Times",
    featured: false,
    summary:
      "Bangla news site covering esports, tournaments, teams and players in Bangladesh and worldwide, run from its own newsroom.",
    client: "Ecube",
    team: "Solo",
    built:
      "Editorial review and scheduling, revision history, auto-posting to Facebook, and push notifications for readers",
    year: "2026",
    status: "live",
    stack: ["Next.js", "Hono", "oRPC", "PostgreSQL", "Tiptap"],
    url: "https://esportstimes.news/",
    image: "/work/the-esports-times/web-home.png",
    imageAlt: "The Esports Times homepage with the lead story and latest Bangla esports news",
    tint: "sand",
  },
  {
    slug: "padma-service",
    name: "Padma Service",
    featured: false,
    summary: "Services marketplace in Bangla and English.",
    team: "Solo",
    built: "Public site, member accounts and admin panel",
    year: "2025–2026",
    status: "live",
    stack: ["Next.js", "Hono", "PostgreSQL"],
    url: "https://padmaservice.com",
    image:
      "https://res.cloudinary.com/def3zwztt/image/upload/v1780456472/%E0%A6%AA%E0%A6%A6%E0%A7%8D%E0%A6%AE%E0%A6%BE-%E0%A6%B8%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AD%E0%A6%BF%E0%A6%B8-%E0%A6%95%E0%A7%8B%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%BE%E0%A6%A8%E0%A6%BF_sntyg5.png",
    imageAlt: "Padma Service public homepage in Bangla",
    tint: "sand",
  },
  {
    slug: "bikalpo",
    name: "Bikalpo",
    featured: false,
    summary: "Online store for everyday products, with categories, brands, offers, seller shops and to-let listings.",
    team: "Lead developer, team of two",
    built: "Storefront, API and mobile app",
    year: "2025–now",
    status: "partial-live",
    stack: ["Next.js", "Drizzle", "PostgreSQL"],
    url: "https://bikalpo.com/",
    github: "https://github.com/Shorno/bikalpo-project",
    image: "/work/bikalpo/web-home.png",
    imageAlt: "Bikalpo storefront homepage: Everyday shopping, made easier",
    tint: "sky",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
