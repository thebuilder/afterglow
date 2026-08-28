import {
  compositionOf,
  documentedParts,
  type ItemDoc,
  nests,
  type PartDoc,
  reference,
} from "@/lib/doc";
import { docFor } from "@/lib/docs";
import { examplesFor } from "@/lib/examples";
import {
  allItems,
  HOMEPAGE,
  installCommand,
  type RegistryItem,
} from "@/lib/registry";
import { sectionsWithItems } from "@/lib/sections";
import { exampleSource, type Source, sourcesFor } from "@/lib/source";

/**
 * The item pages, as markdown.
 *
 * One generator behind `/c/<name>.md`, `/llms-full.txt` and the page's own copy
 * button, so the three cannot end up saying it differently. The site's content
 * is structured data rather than prose, which is what makes this cheap: the
 * markdown is another rendering of `registry.json` and `lib/docs.ts`, not a
 * second copy of them.
 *
 * Examples carry their source on the per-item pages and their names alone in
 * the index. Each one is a file, so the fenced block is that file, byte for
 * byte.
 */
function fence(language: string, body: string): string[] {
  return [`\`\`\`${language}`, body, "```", ""];
}

function heading(item: RegistryItem): string[] {
  return [
    `# ${item.title}`,
    "",
    `> ${item.description}`,
    "",
    `Registry item \`@afterglow/${item.name}\`, at ${HOMEPAGE}/c/${item.name}.`,
    "",
    "## Installation",
    "",
    ...fence("bash", installCommand(item)),
  ];
}

function composition(doc: ItemDoc): string[] {
  return nests(doc.parts)
    ? ["## Composition", "", ...fence("text", compositionOf(doc.parts))]
    : [];
}

function examples(name: string, sources: Source[]): string[] {
  return [
    "## Examples",
    "",
    ...examplesFor(name).flatMap((example, index) => {
      const source = sources[index];
      return [
        `### ${example.name}`,
        "",
        ...(example.description ? [example.description, ""] : []),
        ...(source ? fence("tsx", source.text) : []),
      ];
    }),
  ];
}

function props(part: PartDoc): string[] {
  if (!part.props || part.props.length === 0) {
    return [];
  }

  return [
    "| Prop | Type | Default |",
    "| --- | --- | --- |",
    ...part.props.map((prop) => {
      const type = prop.type.replace(/\|/g, "\\|");
      const fallback = prop.default ? `\`${prop.default}\`` : "-";
      return `| \`${prop.name}\` | \`${type}\` | ${fallback} |`;
    }),
    "",
  ];
}

function api(doc: ItemDoc): string[] {
  const section = reference(doc);

  if (!section) {
    return [];
  }

  return [
    `## ${section.label}`,
    "",
    ...(doc.notes ?? []).flatMap((note) => [note, ""]),
    ...documentedParts(doc).flatMap((part) => [
      `### ${part.name}`,
      "",
      ...(part.summary ? [part.summary, ""] : []),
      ...props(part),
    ]),
    ...(doc.upstream ?? []).flatMap((link) => [
      `Everything else is [${link.label}](${link.href})'s API.`,
      "",
    ]),
  ];
}

interface Bodies {
  /** One per example, in the order the item lists them. */
  examples?: Source[];
  /** Every file the item installs. */
  sources?: Source[];
}

function itemToMarkdown(item: RegistryItem, bodies: Bodies = {}): string {
  const doc = docFor(item.name);
  const sources = bodies.sources ?? [];

  const lines = [
    ...heading(item),
    ...(doc ? composition(doc) : []),
    ...examples(item.name, bodies.examples ?? []),
    ...(doc ? api(doc) : []),
    ...sources.flatMap((source) => [
      `## ${source.path}`,
      "",
      ...fence("tsx", source.text),
    ]),
  ];

  return `${lines.join("\n").trimEnd()}\n`;
}

/** One item, with the source a consumer would be copying. */
export async function itemMarkdown(item: RegistryItem): Promise<string> {
  const [demos, sources] = await Promise.all([
    Promise.all(
      examplesFor(item.name).map((example) => exampleSource(example.file))
    ),
    sourcesFor(item.name),
  ]);

  return itemToMarkdown(item, { examples: demos, sources });
}

/**
 * The index. Annotated links rather than content, so an agent reads this first
 * and then fetches only what it needs.
 */
export function llmsIndex(): string {
  const lines = [
    "# afterglow",
    "",
    "> A shadcn registry for the old-school terminal look. Phosphor green on",
    "> unlit glass, a pink signal for whatever is actually happening, hairline",
    "> borders and no corner radius anywhere. Built on Base UI, not Radix.",
    "",
    "## Using it",
    "",
    "Register the namespace once in `components.json`:",
    "",
    ...fence(
      "json",
      `{ "registries": { "@afterglow": "${HOMEPAGE}/r/{name}.json" } }`
    ),
    "Then `npx shadcn@latest add @afterglow/<item>`. Install `theme` first:",
    "everything else is drawn with its tokens and renders unstyled without it.",
    "",
    "Two things differ from a Radix-based registry. `asChild` is `render`, and",
    "state lands on `data-open` / `data-closed` / `data-checked` rather than on",
    "`data-state`.",
    "",
    `Every item is also served as JSON at ${HOMEPAGE}/r/<name>.json, which`,
    "carries the file contents the CLI installs.",
    "",
    `Everything below, in one file: ${HOMEPAGE}/llms-full.txt`,
    "",
    ...sectionsWithItems().flatMap((section) => [
      `## ${section.title}`,
      "",
      ...section.items.map(
        (item) =>
          `- [${item.title}](${HOMEPAGE}/c/${item.name}.md): ${item.description}`
      ),
      "",
    ]),
  ];

  return `${lines.join("\n").trimEnd()}\n`;
}

/**
 * Every page in one file, without any of the source. Component files are served
 * per item under `/r/` and example files sit behind `/c/<name>.md`, and pasting
 * both here would make the one document an agent fetches first the largest on
 * the site by an order of magnitude.
 */
export function llmsFull(): string {
  return `${allItems()
    .map((item) => itemToMarkdown(item))
    .join("\n---\n\n")
    .trimEnd()}\n`;
}
