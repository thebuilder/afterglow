import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { allItems } from "@/lib/registry";

export const alt = "afterglow, old-school terminal UI components for shadcn";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    body: "Phosphor green on unlit glass. Pink for live signals. Hairline borders. Square corners.",
    eyebrow: "SHADCN REGISTRY",
    meta: `${allItems().length} ITEMS`,
    title: "Old-school terminal UI for shadcn",
  });
}
