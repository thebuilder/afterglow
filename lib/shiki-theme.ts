import type { ThemeRegistrationRaw } from "shiki";

export const CODE_LANGUAGES = ["bash", "css", "html", "json", "tsx"] as const;

export const AFTERGLOW_CODE_THEME: ThemeRegistrationRaw = {
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
