/** Header navigation, in page order. Every `id` is a homepage section anchor. */
export const navSections = [
  { href: "/#projects", label: "Projects", id: "projects" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/#skills", label: "Skills", id: "skills" },
  { href: "/#contact", label: "Contact", id: "contact" },
] as const;

export type NavSectionId = (typeof navSections)[number]["id"];

export const navSectionIds: NavSectionId[] = navSections.map((s) => s.id);
