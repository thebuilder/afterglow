import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: { rehypePlugins: ["rehype-slug"] },
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  rewrites() {
    // Next cannot route a dynamic segment with a literal `.md` suffix.
    return Promise.resolve([
      { destination: "/guide-md/getting-started", source: "/docs.md" },
      { destination: "/guide-md/:slug", source: "/docs/:slug.md" },
      { destination: "/md/:name", source: "/c/:name.md" },
    ]);
  },
};

export default withMDX(nextConfig);
