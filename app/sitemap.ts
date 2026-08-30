import type { MetadataRoute } from "next";

import { allGuides } from "@/lib/guides";
import { allItems, HOMEPAGE } from "@/lib/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set([
    "",
    "/components",
    "/typeset",
    ...allGuides().map((guide) => guide.href),
    ...allItems()
      .filter((item) => item.name !== "theme")
      .map((item) => `/c/${item.name}`),
  ]);

  return [...paths].map((path) => ({ url: `${HOMEPAGE}${path}` }));
}
