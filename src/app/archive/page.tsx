/** The repository archive is available separately from the hiring overview. */
import { IndexSection } from "@/components/index/index-section";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Code archive",
  description: "Shorno Kamal Roy’s repository archive, grouped by year. Source code, project descriptions, and main languages.",
  path: "/archive",
});

export default function ArchivePage() {
  return <IndexSection />;
}
