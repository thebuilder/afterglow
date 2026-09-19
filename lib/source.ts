import { readFile } from "node:fs/promises";
import path from "node:path";

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
  path: string;
  text: string;
}

function destination(file: BuiltFile): string {
  if (file.target) {
    return file.target;
  }

  const directory = DESTINATIONS[file.type];
  const name = path.basename(file.path);

  return directory ? `${directory}/${name}` : name;
}

async function built(name: string): Promise<BuiltItem> {
  // The built item is the exact source shadcn installs.
  const raw = await readFile(
    path.join(process.cwd(), "public", "r", `${name}.json`),
    "utf-8"
  );
  return JSON.parse(raw) as BuiltItem;
}

export async function sourcesFor(name: string): Promise<Source[]> {
  const item = await built(name);

  return (item.files ?? []).map((file) => ({
    path: destination(file),
    text: file.content,
  }));
}

export async function packagesFor(name: string): Promise<string[]> {
  const item = await built(name);
  return item.dependencies ?? [];
}

export async function exampleSource(file: string): Promise<Source> {
  // Literal directory segments keep Next's file trace inside examples.
  const location = path.join(process.cwd(), "components", "examples", file);

  const content = await readFile(location, "utf-8").catch(() => {
    throw new Error(
      `No example file at components/examples/${file}. An example's file is named after the item and the example, so rename one to match the other.`
    );
  });

  return { path: file, text: content };
}
