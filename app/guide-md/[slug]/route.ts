import { guideMarkdown } from "@/lib/guide-source";
import { allGuides, findGuide } from "@/lib/guides";

export const dynamic = "force-static";

// fallow-ignore-next-line unused-export
export function generateStaticParams() {
  return allGuides().map((guide) => ({ slug: guide.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const guide = findGuide(slug);

  if (!guide) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(guideMarkdown(guide), {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
