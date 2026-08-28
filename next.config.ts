import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    `/c/<name>.md` is the shape agents look for and the shape the "view as
    markdown" link points at. Next cannot route a dynamic segment with a literal
    suffix, so the URL is rewritten onto a route that can be.
  */
  rewrites() {
    return Promise.resolve([
      { destination: "/md/:name", source: "/c/:name.md" },
    ]);
  },
};

export default nextConfig;
