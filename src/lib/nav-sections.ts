export const navSections = [
  { href: "/#work", label: "Work", idx: "01", id: "work" },
  { href: "/#experience", label: "Experience", idx: "02", id: "experience" },
  { href: "/#system", label: "System", idx: "03", id: "system" },
  { href: "/#index", label: "Index", idx: "04", id: "index" },
  { href: "/#contact", label: "Contact", idx: "05", id: "contact" },
] as const;

export type NavSectionId = (typeof navSections)[number]["id"];

export const navSectionIds: NavSectionId[] = navSections.map((s) => s.id);
