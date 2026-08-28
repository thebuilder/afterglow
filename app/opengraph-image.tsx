import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { allItems } from "@/lib/registry";

export const alt =
  "afterglow, a shadcn registry for the old-school terminal look";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    body: "Phosphor green on unlit glass, a pink signal for events, hairline borders and no corner radius anywhere.",
    eyebrow: "SHADCN REGISTRY",
    meta: `${allItems().length} ITEMS`,
    title: "Old-school terminal UI for the modern web",
  });
}
