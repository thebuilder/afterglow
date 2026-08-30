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
import { guideMarkdown } from "@/lib/guide-source";
import { allGuides, guideMarkdownUrl } from "@/lib/guides";
import {
  allItems,
  HOMEPAGE,
  installCommand,
  type RegistryItem,
} from "@/lib/registry";
import { sectionsWithItems } from "@/lib/sections";
import { exampleSource, type Source, sourcesFor } from "@/lib/source";

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
  examples?: Source[];
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

export async function itemMarkdown(item: RegistryItem): Promise<string> {
  const [demos, sources] = await Promise.all([
    Promise.all(
      examplesFor(item.name).map((example) => exampleSource(example.file))
    ),
    sourcesFor(item.name),
  ]);

  return itemToMarkdown(item, { examples: demos, sources });
}

export function llmsIndex(): string {
  const lines = [
    "# afterglow",
    "",
    "> A shadcn registry for the old-school terminal look. Phosphor green on",
    "> unlit glass, a pink signal for whatever is actually happening, hairline",
    "> borders and no corner radius anywhere. Built on Base UI.",
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
    "Two Base UI conventions to know. Compose with the `render` prop, and read",
    "state from `data-open` / `data-closed` / `data-checked`.",
    "",
    `Every item is also served as JSON at ${HOMEPAGE}/r/<name>.json, which`,
    "carries the file contents the CLI installs.",
    "",
    `Everything below, in one file: ${HOMEPAGE}/llms-full.txt`,
    "",
    "## Guides",
    "",
    ...allGuides().map(
      (guide) =>
        `- [${guide.title}](${guideMarkdownUrl(guide)}): ${guide.description}`
    ),
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

export function llmsFull(): string {
  return `${[
    ...allGuides().map((guide) => guideMarkdown(guide)),
    ...allItems().map((item) => itemToMarkdown(item)),
  ]
    .join("\n---\n\n")
    .trimEnd()}\n`;
}
