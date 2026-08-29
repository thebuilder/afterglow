import { readFileSync } from "node:fs";
import { flatten } from "../lib/doc.ts";
import { allDocs } from "../lib/docs.ts";

const NOT_A_PART = /Variants$/;

const TYPE_EXPORTS = /export\s+type\s*\{[^}]*\}\s*;?/g;
const EXPORT_BLOCK = /export\s*\{([^}]*)\}/g;
const RENAMED = /\s+as\s+/;
const DECLARED = /export\s+(?:const|function|class)\s+(\w+)/g;
const DEFAULT_EXPORT = /export\s+default/;
const BASE_UI_IMPORT = /from\s+"@base-ui\/react\/([\w-]+)"/g;

function exportsOf(source) {
  const values = source.replace(TYPE_EXPORTS, "");
  const names = new Set();

  for (const block of values.matchAll(EXPORT_BLOCK)) {
    for (const entry of block[1].split(",")) {
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
