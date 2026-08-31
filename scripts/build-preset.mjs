import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY = join(ROOT, "registry.json");

// The preset is the theme and every component, so a new project starts with the
// parts. Blocks are compositions of those parts, and nobody wants a whole
// operator dashboard in an empty project.
const INCLUDED_TYPES = [
  "registry:theme",
  "registry:ui",
  "registry:component",
  "registry:hook",
];

// shadcn writes the `cn` helper itself rather than shipping it as an item, so
// the two packages it needs belong to no entry in the manifest.
const HELPER_PACKAGES = ["clsx", "tailwind-merge"];

const registry = JSON.parse(await readFile(REGISTRY, "utf8"));

const presets = registry.items.filter((item) => item.type === "registry:style");

if (presets.length !== 1) {
  throw new Error(
    `registry.json has ${presets.length} registry:style items. The preset is written into exactly one.`
  );
}

const [preset] = presets;
const included = registry.items.filter((item) =>
  INCLUDED_TYPES.includes(item.type)
);

preset.registryDependencies = included.map(
  (item) => `@${registry.name}/${item.name}`
);
preset.dependencies = [
  ...new Set([
    ...HELPER_PACKAGES,
    ...included.flatMap((item) => item.dependencies ?? []),
  ]),
].sort();

await writeFile(REGISTRY, `${JSON.stringify(registry, null, 2)}\n`);

process.stdout.write(
  `- ${preset.name}: ${preset.registryDependencies.length} items, ${preset.dependencies.length} packages\n`
);
