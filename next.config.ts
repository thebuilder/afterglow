import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites() {
    // Next cannot route a dynamic segment with a literal `.md` suffix.
    return Promise.resolve([
      { destination: "/md/:name", source: "/c/:name.md" },
    ]);
  },
};

export default nextConfig;
