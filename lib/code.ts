import type { Highlighter, ThemeRegistrationRaw } from "shiki";
import { createHighlighter } from "shiki";

import { palette as PALETTE } from "@/registry/terminal/theme.mjs";

/**
 * A syntax theme built out of the registry's own palette.
 *
 * Generated rather than picked so the code on a page is painted with the values
 * the page is handing out. A published theme sitting next to this one would
 * drift the first time a token moves, and the drift would show up as the one
 * place on the site that is not the same green.
 *
 * Mostly one colour, because a terminal is. The four accents are doing specific
 * jobs: the pink marks the words that control what runs, amber marks the
 * literal text, blue the names of types and tags, violet the numbers. Comments
 * drop to the dim green, which is the same move the interface makes for
 * anything that is present rather than active.
 */
const THEME: ThemeRegistrationRaw = {
  colors: {
    "editor.background": PALETTE["panel-sunken"],
    "editor.foreground": PALETTE.phosphor,
  },
  name: "afterglow",
  settings: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { fontStyle: "italic", foreground: PALETTE["phosphor-dim"] },
    },
    {
      scope: ["string", "constant.character", "punctuation.definition.string"],
      settings: { foreground: PALETTE.amber },
    },
    {
      scope: [
        "keyword",
        "storage",
        "storage.type",
        "keyword.control",
        "keyword.operator.new",
        "keyword.operator.expression",
        "variable.language",
      ],
      settings: { foreground: PALETTE.signal },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.language.boolean",
      ],
      settings: { foreground: PALETTE.violet },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.tag",
        "support.type",
        "support.class",
        "support.type.primitive",
      ],
      settings: { foreground: PALETTE.azure },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call.generic",
      ],
      settings: { foreground: PALETTE["phosphor-bright"] },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "keyword.operator",
        "entity.other.attribute-name",
      ],
      settings: { foreground: PALETTE["ink-muted"] },
    },
  ],
  type: "dark",
};

const CODE_LANGUAGES = ["bash", "css", "json", "tsx"] as const;

export type CodeLanguage = (typeof CODE_LANGUAGES)[number];

/*
  One highlighter for the whole build. Every item page asks for one, and
  standing up a fresh WASM-free engine and grammar set per page turns a fast
  build into a slow one.
*/
let pending: Promise<Highlighter> | undefined;

function highlighter(): Promise<Highlighter> {
  pending ??= createHighlighter({
    langs: [...CODE_LANGUAGES],
    themes: [THEME],
  });
  return pending;
}

/** Source in, `<pre>` out. Server only: the highlighter never reaches a browser. */
export async function highlight(
  code: string,
  lang: CodeLanguage
): Promise<string> {
  const shiki = await highlighter();
  return shiki.codeToHtml(code, { lang, theme: "afterglow" });
}
