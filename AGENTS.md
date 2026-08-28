<!-- fallow:agent-install v1 authored sha256=2f456b3d77cbaa985814efe1eea605b380458a353f4d31fd8a0a7a025d39f52c -->
# afterglow

A shadcn registry for the phosphor-tube terminal look, plus the Next.js site
that documents it.

## Project Overview

- Primary package: `afterglow`, a shadcn registry served from `public/r/` and
  published at `https://afterglow.thebuilder.dk`.
- Main entry points: `registry.json` is the manifest and the site's content;
  `app/page.tsx` is the gallery; `app/c/[name]/page.tsx` is one page per item,
  inside the shell in `app/c/layout.tsx`.
- Important directories:
  - `registry/terminal/` is the payload: `theme.mjs`, `ui/` (shadcn primitives
    redrawn), `components/` (the terminal-specific parts), `blocks/`.
  - `app/`, `components/`, `lib/` are the documentation site only. Nothing here
    ships to a consumer.
  - `public/r/` is `shadcn build` output.
- Text output for agents: `/llms.txt` is the annotated index, `/llms-full.txt`
  is every page in one file, and `/c/<name>.md` is one page. All three come from
  `lib/markdown.ts`, so they cannot disagree; the last is a rewrite in
  `next.config.ts`, because Next cannot route a dynamic segment with a literal
  suffix.

## Architecture Notes

### Two things are generated. Do not edit them by hand.

- `app/globals.css` and the `theme` item's `cssVars`/`css` in `registry.json`
  are both written by `scripts/build-globals.mjs` from
  `registry/terminal/theme.mjs`. Change a token there and run
  `pnpm registry:build`.
- `public/r/*.json` is `shadcn build` output.

Biome is configured to ignore all three.

### One thing is hand-written and checked.

`lib/docs.ts`, split across `lib/docs/*.ts`, holds each item's parts, the props
afterglow adds on top of Base UI, and where the rest of the API is documented.
The order, the nesting and the sentences are judgement, so they are written by
hand. The shape is not, so `scripts/check-docs.mjs` asserts it inside
`pnpm registry:build`. It checks three things:

- every item in the manifest has an entry;
- an entry's parts are exactly its file's exports;
- an item built on a Base UI component links to that component.

Add a part to a registry file without adding it there and the build fails.

The nesting is also the only source for the composition tree drawn on the page,
so there is no ASCII art to keep in step with the list beside it.

`scripts/alias.mjs` teaches Node the `@/` alias. That is what lets a build script
import the site's own modules instead of re-deriving what they know.

### Conventions in the payload

- Registry components import siblings as `@/registry/terminal/ui/x` and
  `@/registry/terminal/components/x`. The shadcn CLI rewrites those to the
  consumer's aliases at install time, so the paths must stay in that shape.
- Internal `registryDependencies` are written `@afterglow/<item>`. Bare names
  mean shadcn's own registry, not this one. The namespace is derived from
  `registry.json` in `lib/registry.ts`; do not hardcode it in page code.
- A new item needs four things: the file, an entry in `registry.json`, an entry
  in one of the `components/examples/*.tsx` maps keyed by its name, and an entry
  in the matching `lib/docs/*.ts` map. Missing the third throws at render rather
  than shipping a blank card; missing the fourth fails `pnpm registry:build`.
  The two map files are named alike on purpose, so both edits are in the same
  place.
- Items are ordered alphabetically within their type in `registry.json`, and
  `itemsOfType` sorts again at read time. Append a new item wherever you like in
  the file; it will still land in the right place on the page.
- Primitives are built on Base UI (`@base-ui/react`), not Radix. Composition is
  `render` rather than `asChild`; overlays are `Portal > Positioner > Popup`;
  the dialog scrim is `Backdrop`, not `Overlay`; and state is `data-open` /
  `data-closed` / `data-checked`, not `data-state="open"`. A menu or select
  label must sit inside its `Group`, or Base UI throws at open time.
- Entrances and exits come from `theme.mjs`, not `tw-animate-css`. `animate-in`,
  `fade-in-0` and friends do not exist here; use `animate-open`,
  `animate-close`, `animate-fade-in/out` and the `animate-slide-*` set. Base UI
  defers unmount on a running animation or transition, so anything that opens
  needs a closing half or it vanishes instead of leaving.

### Verifying a change to the payload

Type-checking the site does not prove the registry works, because the site
imports the source directly and a consumer does not. To check the real path,
run:

```sh
pnpm registry:build
```

then install into a scratch Next.js project with a `registries` entry pointing
at `public/r/{name}.json` over a local HTTP server, and confirm the imports were
rewritten and the CSS merged. Import rewriting and CSS merging are the two
things that only break on the far side of `shadcn add`.

Interactive components need driving in a browser as well. Base UI throws at
open time rather than compile time for a misused part, so typecheck alone will
not catch it.

## Commands

- The gate: `pnpm check` (lint, types, dead code, registry build, next build)
- Install: `pnpm install`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Typecheck: `pnpm typecheck`
- Lint: `pnpm lint`, and `pnpm fix` writes what it can
- Registry: `pnpm registry:build`

## Fallow

- Use `fallow audit --format json --quiet` before committing AI-generated changes.
- Use `fallow dead-code --format json --quiet`, `fallow dupes --format json --quiet`, and `fallow health --format json --quiet` for targeted checks.
- Use `fallow list --entry-points --format json --quiet` and `fallow list --boundaries --format json --quiet` to inspect project shape.

<!-- generated:task-matrix:start -->
| When the agent is about to... | Run |
|---|---|
| delete an "unused" export or file | `fallow dead-code --trace <file>:<export>` |
| prove a TypeScript symbol's exact consumers before refactoring | `fallow dead-code --type-aware --symbol-impact <file>:<export-or-class.method>` |
| delete an "unused" dependency | `fallow dead-code --trace-dependency <name>` |
| commit or open a PR | `fallow audit --base <ref>` |
| prioritize refactoring | `fallow health --hotspots --targets` |
| ask who owns code | `fallow health --ownership` |
| check untested-but-reachable code | `fallow health --coverage-gaps` |
| consolidate duplication | `fallow dupes --trace dup:<fingerprint>` |
| find feature flags | `fallow flags` |
| check which architecture rules apply to a file before changing it | `fallow guard <files>` |
| surface security candidates | `fallow security` |
| understand a finding | `fallow explain <issue-type>` |
| scope a monorepo | `--workspace <glob> / --changed-workspaces <ref>` (global flags, prefix any command) |
<!-- generated:task-matrix:end -->

## Agent Rules

- Do not edit: `app/globals.css`, `public/r/**`, or the `cssVars`/`css` of the
  `theme` item in `registry.json`. All three are generated.
- Always ask before: pushing, or changing the registry `name` or `homepage`.
  Both are baked into every install command the site and README print.
- Comments say why, not what, and are worth writing where a decision would
  otherwise read as an accident.
- Never use em dashes, in code, comments or prose. Commas or full stops instead.
- Run any prose through the `unslop` skill before committing it. That covers
  registry item descriptions, example descriptions, the site's copy, this file
  and the README, all of which are read by people evaluating the registry. Two
  habits this codebase keeps slipping back into: the colon used as a mid-sentence
  connector, and the "X, not Y" construction, which stops being a point once
  every third description makes it.

---

<!-- fallow:setup-hooks:start -->
## Fallow local gate

Before any `git commit` or `git push`, run `fallow audit --format json --quiet --explain --gate-marker agent`. If the verdict is `fail`, fix the reported findings before retrying. Treat JSON runtime errors like `{ "error": true, ... }` as non-blocking.

Audit defaults to `gate=new-only`: only findings introduced by the current changeset affect the verdict. Inherited findings on touched files are reported under `attribution` and annotated with `introduced: false`, but do not block the commit. Set `[audit] gate = "all"` in `fallow.toml` to gate every finding in changed files.

For non-skill agents, treat the task map below as the local onboarding source: run the listed fallow command before destructive edits, before commits, and before pull request handoff.

## Fallow task map

| When the agent is about to... | Run |
|---|---|
| delete an "unused" export or file | `fallow dead-code --trace <file>:<export>` |
| prove a TypeScript symbol's exact consumers before refactoring | `fallow dead-code --type-aware --symbol-impact <file>:<export-or-class.method>` |
| delete an "unused" dependency | `fallow dead-code --trace-dependency <name>` |
| commit or open a PR | `fallow audit --base <ref>` |
| prioritize refactoring | `fallow health --hotspots --targets` |
| ask who owns code | `fallow health --ownership` |
| check untested-but-reachable code | `fallow health --coverage-gaps` |
| consolidate duplication | `fallow dupes --trace dup:<fingerprint>` |
| find feature flags | `fallow flags` |
| check which architecture rules apply to a file before changing it | `fallow guard <files>` |
| surface security candidates | `fallow security` |
| understand a finding | `fallow explain <issue-type>` |
| scope a monorepo | `--workspace <glob> / --changed-workspaces <ref>` (global flags, prefix any command) |
<!-- fallow:setup-hooks:end -->
