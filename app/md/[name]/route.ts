import { itemMarkdown } from "@/lib/markdown";
import { allItems, findItem } from "@/lib/registry";

/*
  Reached as `/c/<name>.md`, which `next.config.ts` rewrites here. Next cannot
  route a dynamic segment with a literal suffix, and `/c/<name>.md` is the shape
  every agent and every "view as markdown" link already expects.
*/
export const dynamic = "force-static";

// Next calls this to prerender one file per item; nothing in this repository
// does. fallow knows the convention for a page, but not for a route handler.
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
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
