import { readFileSync } from "node:fs";
import path from "node:path";

import type { Guide } from "@/lib/guides";

export function guideMarkdown(guide: Guide): string {
  const source = readFileSync(
    path.join(process.cwd(), "content", "docs", guide.source),
    "utf-8"
  ).trim();

  return `# ${guide.title}\n\n> ${guide.description}\n\n${source}\n`;
}
