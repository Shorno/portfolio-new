/**
 * Skills grouped by what they are for, each tool backed by a project on the homepage.
 * Repository language colors remain separate for the code archive.
 */
export type SkillGroup = {
  label: string;
  tools: string[];
};

export const skillGroups: SkillGroup[] = [
  { label: "Frontend", tools: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { label: "Backend & databases", tools: ["Node.js", "Bun", "Hono", "PostgreSQL", "Drizzle ORM"] },
  { label: "Mobile", tools: ["React Native", "Expo"] },
  { label: "Real-time & background jobs", tools: ["Socket.IO", "Pusher", "Inngest"] },
  { label: "DevOps", tools: ["Coolify", "VPS hosting", "Cloudflare R2"] },
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
