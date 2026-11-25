import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    // Preserve paths from the previous domain and consolidate the www alias.
    const hosts = ["www.shorno.dev", "shorno.me", "www.shorno.me"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host.replaceAll(".", "\\.") }],
      destination: "https://shorno.dev/:path*",
      permanent: true,
    }));
    // Case-study pages were removed; old links (CVs, search results) land on the project list.
    // Single segment only: screenshots under /public/work/<slug>/ must still be served.
    return [...hosts, { source: "/work/:slug([a-z0-9-]+)", destination: "/#projects", permanent: true }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
