import type { MetadataRoute } from "next";

import { HOMEPAGE } from "@/lib/registry";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: `${HOMEPAGE}/sitemap.xml`,
  };
}
