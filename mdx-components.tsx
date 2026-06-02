import type { MDXComponents } from "mdx/types";
import { mdxPrimitives } from "@/components/case-study/mdx-primitives";

/**
 * Global MDX component map. Picked up automatically by @next/mdx.
 * Lives at the project root per Next.js convention.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, ...mdxPrimitives };
}
