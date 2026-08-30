import { itemMarkdown } from "@/lib/markdown";
import { allItems, findItem } from "@/lib/registry";

export const dynamic = "force-static";

// fallow-ignore-next-line unused-export
export function generateStaticParams() {
  return allItems().map((item) => ({ name: item.name }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const item = findItem(name);

  if (!item) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(await itemMarkdown(item), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "x-robots-tag": "noindex",
    },
  });
}
