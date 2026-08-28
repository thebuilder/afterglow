import { readFileSync } from "node:fs";
import { flatten } from "../lib/doc.ts";
import { allDocs } from "../lib/docs.ts";

/**
 * Holds `lib/docs.ts` to the registry it documents.
 *
 * The parts list on an item's page is hand-written, because the useful order,
 * the nesting and the sentences that are worth saying are all judgement. What
 * is not judgement is whether the list is complete, and that is the half that
 * rots: an item grows a part, the page keeps rendering, and nobody finds out
 * until somebody goes looking for a component the registry ships and the site
 * has never heard of.
 *
 * So the shape is checked here rather than trusted. Three things:
 *
 *   - every item in the manifest has an entry;
 *   - the entry's parts are exactly the file's exports;
 *   - an item built on a Base UI component links to that component.
 *
 * Runs inside `pnpm registry:build`, ahead of `shadcn build`, so the failure
 * lands before anything is published.
 */

/** cva helpers are exported for composition, not as parts to document. */
const NOT_A_PART = /Variants$/;

const TYPE_EXPORTS = /export\s+type\s*\{[^}]*\}\s*;?/g;
const EXPORT_BLOCK = /export\s*\{([^}]*)\}/g;
const RENAMED = /\s+as\s+/;
const DECLARED = /export\s+(?:const|function|class)\s+(\w+)/g;
const DEFAULT_EXPORT = /export\s+default/;
const BASE_UI_IMPORT = /from\s+"@base-ui\/react\/([\w-]+)"/g;

function exportsOf(source) {
  /* Type-only exports first: `export type { BootLine }` is a type a consumer
     may annotate with, not a component with a place in the tree. */
  const values = source.replace(TYPE_EXPORTS, "");
  const names = new Set();

  for (const block of values.matchAll(EXPORT_BLOCK)) {
    for (const entry of block[1].split(",")) {
      /* `export { TONES as glyphTones }` is exported under the second name. */
      const name = entry.trim().split(RENAMED).pop()?.trim();
      if (name) {
        names.add(name);
      }
    }
  }

  for (const declared of values.matchAll(DECLARED)) {
    names.add(declared[1]);
  }

  if (DEFAULT_EXPORT.test(values)) {
    names.add("default");
  }

  return [...names].filter((name) => !NOT_A_PART.test(name));
}

/**
 * The Base UI components a file is built on. `merge-props` and `use-render` are
 * composition helpers with no component page to link to.
 */
const HELPERS = new Set(["merge-props", "use-render"]);

function baseUiOf(source) {
  return [
    ...new Set([...source.matchAll(BASE_UI_IMPORT)].map((match) => match[1])),
  ].filter((module) => !HELPERS.has(module));
}

const registry = JSON.parse(readFileSync("registry.json", "utf8"));
const docs = allDocs();
const problems = [];

for (const item of registry.items) {
  const doc = docs[item.name];

  if (!doc) {
    problems.push(`${item.name}: no entry in lib/docs.ts`);
    continue;
  }

  const sources = (item.files ?? []).map((file) =>
    readFileSync(file.path, "utf8")
  );

  const exported = sources.flatMap(exportsOf).sort();
  const documented = flatten(doc.parts)
    .map((part) => part.name)
    .sort();

  const missing = exported.filter((name) => !documented.includes(name));
  const invented = documented.filter((name) => !exported.includes(name));

  if (missing.length > 0) {
    problems.push(
      `${item.name}: exports ${missing.join(", ")}, not documented`
    );
  }
  if (invented.length > 0) {
    problems.push(
      `${item.name}: documents ${invented.join(", ")}, not exported`
    );
  }

  const upstream = (doc.upstream ?? []).map((link) => link.href).join(" ");
  const unlinked = baseUiOf(sources.join("\n")).filter(
    (module) => !upstream.includes(`/components/${module}`)
  );

  /* One link is enough. `toggle-group` is built on two Base UI components and
     only the group has a page worth sending anyone to. */
  if (unlinked.length > 0 && upstream === "") {
    problems.push(
      `${item.name}: built on Base UI ${unlinked.join(", ")}, links to nothing`
    );
  }
}

if (problems.length > 0) {
  process.stderr.write(
    `lib/docs.ts is out of step with the registry:\n${problems.map((line) => `  ${line}`).join("\n")}\n`
  );
  process.exit(1);
}

const parts = Object.values(docs).reduce(
  (total, doc) => total + flatten(doc.parts).length,
  0
);
process.stdout.write(
  `- ${Object.keys(docs).length} items documented, ${parts} parts\n`
);
