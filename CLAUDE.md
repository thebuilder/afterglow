# afterglow

A shadcn registry for the phosphor-tube terminal look, plus the Next.js site
that documents it.

- `registry/terminal/` is the payload: `theme.mjs`, `ui/` (shadcn primitives
  redrawn), `components/` (the terminal-specific parts), `blocks/`.
- `registry.json` is the manifest, and the site's content.
- `app/`, `components/`, `lib/` are the documentation site only. Nothing here
  ships to a consumer.

## The gate

```sh
pnpm check      # lint, types, dead code, registry build, next build
```

## Two things are generated. Do not edit them by hand.

- `app/globals.css` and the `theme` item's `cssVars`/`css` in `registry.json`
  are both written by `scripts/build-globals.mjs` from
  `registry/terminal/theme.mjs`. Change a token there and run
  `pnpm registry:build`.
- `public/r/*.json` is `shadcn build` output.

Biome is configured to ignore all three.

## Conventions in the payload

- Registry components import siblings as `@/registry/terminal/ui/x` and
  `@/registry/terminal/components/x`. The shadcn CLI rewrites those to the
  consumer's aliases at install time, so the paths must stay in that shape.
- Internal `registryDependencies` are written `@afterglow/<item>`. Bare names
  mean shadcn's own registry, not this one.
- A new item needs three things: the file, an entry in `registry.json`, and an
  entry in one of the `components/examples/*.tsx` maps keyed by its name.
  Missing the third throws at render rather than shipping a blank card.
- Primitives are built on Base UI (`@base-ui/react`), not Radix. Composition is
  `render` rather than `asChild`; overlays are `Portal > Positioner > Popup`;
  the dialog scrim is `Backdrop`, not `Overlay`; and state is `data-open` /
  `data-closed` / `data-checked`, not `data-state="open"`. A menu or select
  label must sit inside its `Group`, or Base UI throws at open time.
- Entrances and exits come from `theme.mjs`, not `tw-animate-css`. `animate-in`,
  `fade-in-0` and friends do not exist here; use `animate-open`,
  `animate-close`, `animate-fade-in/out` and the `animate-slide-*` set. Radix
  defers unmount on a running CSS animation, so anything that opens needs a
  closing half or it vanishes instead of leaving.

## Verifying a change to the payload

Type-checking the site does not prove the registry works, because the site
imports the source directly and a consumer does not. To check the real path:

```sh
pnpm registry:build
```

then install into a scratch Next.js project with a `registries` entry pointing
at `public/r/{name}.json` over a local HTTP server, and confirm the imports were
rewritten and the CSS merged. Import rewriting and CSS merging are the two
things that only break on the far side of `shadcn add`.

<!-- fallow:agent-install v1 claude-import:start -->
@AGENTS.md
<!-- fallow:agent-install v1 claude-import:end -->
