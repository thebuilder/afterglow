import { readFileSync } from "node:fs";
import { join } from "node:path";

import type { Guide } from "@/lib/guides";

export function guideMarkdown(guide: Guide): string {
  const source = readFileSync(
    join(process.cwd(), "content", "docs", guide.source),
    "utf8"
  ).trim();

  return `# ${guide.title}\n\n> ${guide.description}\n\n${source}\n`;
}
