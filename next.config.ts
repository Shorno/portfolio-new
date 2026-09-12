import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    // Preserve paths from the previous domain and consolidate the www alias.
    return ["www.shorno.dev", "shorno.me", "www.shorno.me"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host.replaceAll(".", "\\.") }],
      destination: "https://shorno.dev/:path*",
      permanent: true,
    }));
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
