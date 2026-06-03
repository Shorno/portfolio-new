export const site = {
  name: "Shorno",
  fullName: "Shorno Kamal Roy",
  role: "Full-stack engineer",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  email: "fb.shorno@gmail.com",
  phone: "+8801841151827",
  linkedin: "https://www.linkedin.com/in/shorno/",
  facebook: "https://www.facebook.com/MrShorno911/",
  url: "https://www.shorno.me",
  github: "https://github.com/Shorno",
  github_handle: "Shorno",
  /** Public CV link — opens in a new tab from the hero CTA and the header. */
  cvUrl:
    "https://drive.google.com/file/d/14hbpyAh-xJkCNMS-3hGcLWydYXj8Idbm/view?usp=sharing",
  company: "AppCube",
  status: "available" as "available" | "limited" | "booked",
  tagline:
    "Full-stack engineer for the boring systems your company actually runs on.",
  /** Meta description — search + social previews (keep tagline for on-page voice). */
  seoDescription:
    "Full-stack engineer in Dhaka, Bangladesh. I build multi-party marketplaces, role-based platforms, and wholesale tooling with Next.js, TypeScript, Postgres, and React Native. Available for client work.",
  subline:
    "Multi-party marketplaces, role-based platforms, wholesale tooling. From planning through to the live product.",
} as const;

/**
 * Repo blurbs when GitHub has no description — see `src/lib/repo-descriptions.ts`.
 * Edit that file to add or change INDEX copy without touching GitHub.
 */

/**
 * Repo full-names (`"owner/repo"`) to suppress from §03 INDEX.
 *
 * Useful when auto-discovery surfaces contributor / org-member repos
 * that shouldn't be on a public portfolio (NDA work, abandoned forks,
 * client-org repos with revealing names, etc.). Add a string here to
 * hide a repo without revoking the GitHub token.
 */
export const excludeRepos: ReadonlyArray<string> = [
  // SelfShop fork — fresh artifact, no original commits. The case study
  // in §01 already covers this work; hiding the fork keeps §03 honest
  // about authored repos.
  "Shorno/selfshop",
];

/**
 * Contributor / org-owned repos to show in §03 INDEX with a `co` chip.
 *
 * With a `GITHUB_TOKEN`, GitHub returns every repo you can access (collabs,
 * org membership, course forks, etc.). By default only `Shorno/*` owner repos
 * are shown. Add a full name here to surface a specific collaborator repo.
 */
export const includeContributorRepos: ReadonlyArray<string> = [
  "adrasel404-bot/selfshop",
  "IftakharRahat/DIMS",
];
