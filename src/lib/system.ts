/**
 * Skills grouped by engineering responsibility. Each points to work that uses them.
 * Repository language colors remain separate for the optional code archive.
 */
export type SkillGroup = {
  label: string;
  tools: string[];
  description: string;
  projectSlug: string;
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    tools: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    description: "Responsive interfaces, forms, data tables, and state management.",
    projectSlug: "stock-management",
  },
  {
    label: "Backend & data",
    tools: ["Hono", "oRPC", "PostgreSQL", "Drizzle", "Better-Auth"],
    description: "API design, database schemas, authentication, and role-based access.",
    projectSlug: "ecube-tournament",
  },
  {
    label: "Mobile",
    tools: ["React Native", "Expo", "Tamagui"],
    description: "Mobile applications that share APIs with the web product.",
    projectSlug: "selfshop",
  },
  {
    label: "Deployment",
    tools: ["Coolify", "VPS hosting"],
    description: "Deploying web applications and APIs to a VPS.",
    projectSlug: "padma-service",
  },
];

/** GitHub language colors are metadata in the code archive, not interface tokens. */
export const languageColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  MDX: "#fcb32c",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Dockerfile: "#384d54",
};
