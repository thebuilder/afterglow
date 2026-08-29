import type { Highlighter, ThemeRegistrationRaw } from "shiki";
import { createHighlighter } from "shiki";

import { palette as PALETTE } from "@/registry/terminal/theme.mjs";

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

let pending: Promise<Highlighter> | undefined;

function highlighter(): Promise<Highlighter> {
  pending ??= createHighlighter({
    langs: [...CODE_LANGUAGES],
    themes: [THEME],
  });
  return pending;
}

export async function highlight(
  code: string,
  lang: CodeLanguage
): Promise<string> {
  const shiki = await highlighter();
  return shiki.codeToHtml(code, { lang, theme: "afterglow" });
}
