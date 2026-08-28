import { readFileSync } from "node:fs";

/**
 * A description has three jobs it has to do at once: two clamped lines on a
 * gallery card, a line under the title on the item page, and the body of a
 * social card 1200px wide. The card is the tightest of the three, so the limit
 * is set by what fits there without wrapping past four lines.
 *
 * Held to a number rather than to judgement because the drift is one item at a
 * time. Nothing looks wrong the day it is added.
 */
const LIMIT = 120;

const registry = JSON.parse(readFileSync("registry.json", "utf8"));

const tooLong = registry.items
  .filter((item) => item.description.length > LIMIT)
  .map(
    (item) => `  ${item.name} (${item.description.length}): ${item.description}`
  );

if (tooLong.length > 0) {
  process.stderr.write(
    `${tooLong.length} description(s) over ${LIMIT} characters:\n${tooLong.join("\n")}\n`
  );
  process.exit(1);
}

const lengths = registry.items.map((item) => item.description.length);
process.stdout.write(
  `- ${registry.items.length} descriptions, longest ${Math.max(...lengths)}/${LIMIT}\n`
);
