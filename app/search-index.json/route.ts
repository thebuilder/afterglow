import { searchIndex } from "@/lib/search";

/*
  Static. Every page on this site is prerendered, and an index of a manifest
  that cannot change between deploys has no business being computed per request.
*/
export const dynamic = "force-static";

export function GET() {
  return Response.json(searchIndex());
}
