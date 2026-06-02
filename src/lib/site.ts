export const site = {
  name: "Shorno",
  fullName: "Shorno Kamal Roy",
  role: "Full-stack engineer",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  email: "fb.shorno@gmail.com",
  url: "https://www.shorno.me",
  github: "https://github.com/Shorno",
  github_handle: "Shorno",
  /** Public CV link — opens in a new tab from the hero CTA and the header. */
  cvUrl: "https://drive.google.com/file/d/REPLACE_ME/view",
  company: "AppCube",
  status: "available" as "available" | "limited" | "booked",
  tagline:
    "Full-stack engineer for the boring systems your company actually runs on.",
  subline:
    "Multi-tenant SaaS, B2B commerce, internal tooling. End-to-end — from Postgres schemas to the last pixel.",
} as const;

/**
 * Repo full-names (`"owner/repo"`) to suppress from §03 INDEX.
 *
 * Useful when auto-discovery surfaces contributor / org-member repos
 * that shouldn't be on a public portfolio (NDA work, abandoned forks,
 * client-org repos with revealing names, etc.). Add a string here to
 * hide a repo without revoking the GitHub token.
 */
export const excludeRepos: ReadonlyArray<string> = [];
