import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { allItems } from "@/lib/registry";

export const alt = "Afterglow, terminal UI components for shadcn projects";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    body: "Built on Base UI. Eight phosphor themes, CRT effects, and React components copied directly into your app.",
    eyebrow: "SHADCN REGISTRY",
    meta: `${allItems().length} ITEMS · SOURCE INCLUDED`,
    title: "Terminal UI components for shadcn projects",
  });
}
