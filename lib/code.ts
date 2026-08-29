import type { Highlighter } from "shiki";
import { createHighlighter } from "shiki";

import { AFTERGLOW_CODE_THEME, CODE_LANGUAGES } from "@/lib/shiki-theme";

export type CodeLanguage = (typeof CODE_LANGUAGES)[number];

let pending: Promise<Highlighter> | undefined;

function highlighter(): Promise<Highlighter> {
  pending ??= createHighlighter({
    langs: [...CODE_LANGUAGES],
    themes: [AFTERGLOW_CODE_THEME],
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
