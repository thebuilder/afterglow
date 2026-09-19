import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...(ultracite.ignorePatterns ?? []),
    // Generated, in whole or in part, by `pnpm registry:build`. Formatting them
    // is formatting an artefact, and worse, `registry.json` and the formatter
    // would take turns rewriting each other on every run. Everything else the
    // build produces is already out via .gitignore.
    "app/globals.css",
    "registry.json",
    "public/r",
    // `assets` is data rather than source. The fonts are binary, and the logo
    // is pasted verbatim into shadcn's directory.json, so its bytes are the
    // artefact and reflowing them is not an improvement.
    "assets",
    // Skills are installed by their tools (fallow writes its own), and
    // reformatting one is a diff against the next install.
    ".agents/skills",
    ".claude/skills",
    // fallow writes blocks into these and records a hash of the file, so a
    // reflow here is a diff against its next install.
    "AGENTS.md",
    "CLAUDE.md",
  ],
  // A fence in the docs is a fragment, and formatting it as a whole file
  // closes an `<html>` that was open on purpose and adds a semicolon after
  // a JSX snippet.
  embeddedLanguageFormatting: "off",
  // The prose in this repository is hand-wrapped at 80 columns. Ultracite's
  // `never` would unwrap every paragraph of it.
  proseWrap: "preserve",
  // The registry payload is source somebody else will own. Sorting a
  // consumer's classes for them is a change they did not ask for, and the
  // sorter's order disagrees with the one shadcn's own components ship in.
  sortTailwindcss: false,
});
