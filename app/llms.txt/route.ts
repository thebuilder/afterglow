import { llmsIndex } from "@/lib/markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsIndex(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
