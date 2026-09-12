export const navSections = [
  { href: "/#experience", label: "Experience", idx: "01", id: "experience" },
  { href: "/#work", label: "Projects", idx: "02", id: "work" },
  { href: "/#system", label: "Skills", idx: "03", id: "system" },
  { href: "/#contact", label: "Contact", idx: "04", id: "contact" },
] as const;

export type NavSectionId = (typeof navSections)[number]["id"];

export const navSectionIds: NavSectionId[] = navSections.map((s) => s.id);
