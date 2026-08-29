import { searchIndex } from "@/lib/search";

export const dynamic = "force-static";

export function GET() {
  return Response.json(searchIndex());
}
