import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { highlight } from "@/lib/code";

/**
 * What `shadcn build` wrote for one item.
 *
 * The build output is the source of truth for the source. `public/r/*.json`
 * already carries the exact bytes the CLI will write into somebody's project,
 * so a page that reads them cannot show code that differs from the code that
 * gets installed. Reading `registry/terminal/**` directly would look the same
 * and would quietly stop being true the day the build starts transforming
 * anything.
 */
interface BuiltFile {
  content: string;
  path: string;
  target?: string;
  type: string;
}

interface BuiltItem {
  dependencies?: string[];
  files?: BuiltFile[];
}

/**
 * Where a file lands in a consumer's project, which is the only path worth
 * printing above it. Our own `registry/terminal/...` path is an implementation
 * detail of this repository and means nothing on the far side of an install.
 *
 * `target` is authoritative when the item sets one; shadcn derives the rest
 * from the file's type and the consumer's aliases, and these are the defaults.
 */
const DESTINATIONS: Record<string, string> = {
  "registry:component": "components",
  "registry:hook": "hooks",
  "registry:lib": "lib",
  "registry:ui": "components/ui",
};

export interface Source {
  /** Highlighted HTML, ready to drop into a `<pre>`. */
  html: string;
  /** The path a consumer will find this at. */
  path: string;
  /** The unhighlighted source, for the markdown routes and the copy button. */
  text: string;
}

function destination(file: BuiltFile): string {
  if (file.target) {
    return file.target;
  }

  const directory = DESTINATIONS[file.type];
  const name = basename(file.path);

  return directory ? `${directory}/${name}` : name;
}

async function built(name: string): Promise<BuiltItem> {
  const raw = await readFile(
    join(process.cwd(), "public", "r", `${name}.json`),
    "utf8"
  );
  return JSON.parse(raw) as BuiltItem;
}

/**
 * Every file an item installs, highlighted.
 *
 * Empty for the theme and the style, which install variables and other items
 * rather than files. That is a fact about them worth showing rather than an
 * error, so the caller gets an empty list and decides what to say.
 */
export async function sourcesFor(name: string): Promise<Source[]> {
  const item = await built(name);

  return Promise.all(
    (item.files ?? []).map(async (file) => ({
      html: await highlight(file.content, "tsx"),
      path: destination(file),
      text: file.content,
    }))
  );
}

/** The npm packages an item pulls in, as the built item records them. */
export async function packagesFor(name: string): Promise<string[]> {
  const item = await built(name);
  return item.dependencies ?? [];
}

/**
 * One example's file, highlighted.
 *
 * These are read from the repository, not from `public/r/`, because an example
 * is not a registry item and nothing builds it. What comes back is the whole
 * file, imports and `"use client"` included, so the block under an example is
 * something you can paste into a project.
 *
 * `lib/examples.ts` names the file. A rename that leaves the file behind stops
 * the build here, before it can show somebody another component's code.
 */
export async function exampleSource(file: string): Promise<Source> {
  /* Joined from literal segments rather than from a path carrying its own
     directory. A `join` whose first variable part is the folder reads to Next
     as an access anywhere under the root, and it traces the whole repository
     into the server bundle to be safe. */
  const path = join(process.cwd(), "components", "examples", file);

  const content = await readFile(path, "utf8").catch(() => {
    throw new Error(
      `No example file at components/examples/${file}. An example's file is named after the item and the example, so rename one to match the other.`
    );
  });

  return { html: await highlight(content, "tsx"), path: file, text: content };
}
