import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";

import { highlight } from "@/lib/code";

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

const DESTINATIONS: Record<string, string> = {
  "registry:component": "components",
  "registry:hook": "hooks",
  "registry:lib": "lib",
  "registry:ui": "components/ui",
};

export interface Source {
  html: string;
  path: string;
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
  // The built item is the exact source shadcn installs.
  const raw = await readFile(
    join(process.cwd(), "public", "r", `${name}.json`),
    "utf8"
  );
  return JSON.parse(raw) as BuiltItem;
}

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

export async function packagesFor(name: string): Promise<string[]> {
  const item = await built(name);
  return item.dependencies ?? [];
}

export async function exampleSource(file: string): Promise<Source> {
  // Literal directory segments keep Next's file trace inside examples.
  const path = join(process.cwd(), "components", "examples", file);

  const content = await readFile(path, "utf8").catch(() => {
    throw new Error(
      `No example file at components/examples/${file}. An example's file is named after the item and the example, so rename one to match the other.`
    );
  });

  return { html: await highlight(content, "tsx"), path: file, text: content };
}
