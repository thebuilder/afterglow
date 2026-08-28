import { notFound } from "next/navigation";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { allItems, findItem } from "@/lib/registry";

export const alt = "An Afterglow component for shadcn";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return allItems().map((item) => ({ name: item.name }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const item = findItem(name);

  if (!item) {
    notFound();
  }

  return ogImage({
    body: item.description,
    eyebrow: item.type.replace("registry:", "").toUpperCase(),
    meta: `@AFTERGLOW/${item.name.toUpperCase()}`,
    title: item.title,
  });
}
