import { readFileSync } from "node:fs";

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
