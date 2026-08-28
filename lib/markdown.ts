import { examplesFor } from "@/components/examples";
import {
  compositionOf,
  documentedParts,
  type ItemDoc,
  nests,
  type PartDoc,
  reference,
} from "@/lib/doc";
import { docFor } from "@/lib/docs";
import {
  allItems,
  HOMEPAGE,
  installCommand,
  type RegistryItem,
} from "@/lib/registry";
import { sectionsWithItems } from "@/lib/sections";
import { type Source, sourcesFor } from "@/lib/source";

/**
 * The item pages, as markdown.
 *
 * One generator behind `/c/<name>.md`, `/llms-full.txt` and the page's own copy
 * button, so the three cannot end up saying it differently. The site's content
 * is structured data rather than prose, which is what makes this cheap: the
 * markdown is another rendering of `registry.json` and `lib/docs.ts`, not a
 * second copy of them.
 *
 * Examples are named and described, never reproduced. They are React trees, and
 * a rendering of one into a fenced block would be a picture of source code.
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

function examples(name: string): string[] {
  const found = examplesFor(name);

  if (found.length === 0) {
    return [];
  }

  return [
    "## Examples",
    "",
    ...found.map((example) =>
      example.description
        ? `- **${example.name}**. ${example.description}`
        : `- **${example.name}**`
    ),
    "",
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

function itemToMarkdown(item: RegistryItem, sources: Source[] = []): string {
  const doc = docFor(item.name);

  const lines = [
    ...heading(item),
    ...(doc ? composition(doc) : []),
    ...examples(item.name),
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
  return itemToMarkdown(item, await sourcesFor(item.name));
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
 * Every page in one file, without the component sources. The sources are
 * already served per item under `/r/`, and repeating fifty-one files here would
 * make the one document an agent fetches first the largest one on the site.
 */
export function llmsFull(): string {
  return `${allItems()
    .map((item) => itemToMarkdown(item))
    .join("\n---\n\n")
    .trimEnd()}\n`;
}
