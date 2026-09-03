import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import { AFTERGLOW_CODE_THEME, CODE_LANGUAGES } from "./lib/shiki-theme";

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [
        "@shikijs/rehype",
        {
          langs: [...CODE_LANGUAGES],
          theme: AFTERGLOW_CODE_THEME,
        },
      ],
      "rehype-slug",
    ],
  },
});

const nextConfig: NextConfig = {
  // The per-item OG route renders on demand, because generateStaticParams for
  // `[name]` lives in the sibling page and a metadata route cannot reach it. So
  // its fonts are read by path at request time, which the tracer cannot follow,
  // and the function ships without them unless they are named here.
  outputFileTracingIncludes: { "opengraph-image": ["./assets/*.woff"] },
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
