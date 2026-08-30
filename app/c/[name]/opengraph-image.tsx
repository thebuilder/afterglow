import { notFound } from "next/navigation";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { findItem } from "@/lib/registry";

export function generateImageMetadata({
  params,
}: {
  params: { name: string };
}) {
  const item = findItem(params.name);

  if (!item || item.name === "theme") {
    return [];
  }

  return [
    {
      alt: `${item.title} component from the Afterglow terminal UI library`,
      contentType: OG_CONTENT_TYPE,
      id: item.name,
      size: OG_SIZE,
    },
  ];
}

export default async function Image({ id }: { id: Promise<string | number> }) {
  const name = String(await id);
  const item = findItem(name);

  if (!item || item.name === "theme") {
    notFound();
  }

  return ogImage({
    body: item.description,
    eyebrow: item.type.replace("registry:", "").toUpperCase(),
    meta: `@AFTERGLOW/${item.name.toUpperCase()}`,
    title: item.title,
  });
}
