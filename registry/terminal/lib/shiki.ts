import type { Highlighter, ThemeRegistrationRaw } from "shiki";
import { createHighlighter } from "shiki";

// The grammars the highlighter loads up front. Shiki compiles every one of
// these on first use, so add a language when you need it rather than in case.
export const CODE_LANGUAGES = ["bash", "css", "html", "json", "tsx"] as const;

export type CodeLanguage = (typeof CODE_LANGUAGES)[number];

// Shiki writes colors straight onto the tokens, so the theme hands it variable
// references instead of hex. A code block then follows the phosphor the page is
// set to, rather than carrying a second palette of its own.
export const CODE_THEME: ThemeRegistrationRaw = {
  colors: {
    "editor.background": "var(--panel-sunken)",
    "editor.foreground": "var(--phosphor)",
  },
  name: "afterglow",
  settings: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        fontStyle: "italic",
        foreground: "var(--phosphor-dim)",
      },
    },
    {
      scope: ["string", "constant.character", "punctuation.definition.string"],
      settings: { foreground: "var(--warning)" },
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
      settings: { foreground: "var(--signal)" },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.language.boolean",
      ],
      settings: { foreground: "var(--violet)" },
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
      settings: { foreground: "var(--info)" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call.generic",
      ],
      settings: { foreground: "var(--phosphor-bright)" },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "keyword.operator",
        "entity.other.attribute-name",
      ],
      settings: { foreground: "var(--muted-foreground)" },
    },
  ],
  type: "dark",
};

let pending: Promise<Highlighter> | undefined;

function highlighter(): Promise<Highlighter> {
  pending ??= createHighlighter({
    langs: [...CODE_LANGUAGES],
    themes: [CODE_THEME],
  });
  return pending;
}

export async function highlightCode(
  code: string,
  lang: CodeLanguage
): Promise<string> {
  const shiki = await highlighter();
  return shiki.codeToHtml(code, { lang, theme: "afterglow" });
}
