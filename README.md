# afterglow

A [shadcn registry](https://ui.shadcn.com/docs/registry) for the old-school
terminal look. Phosphor green on unlit glass. Pink for live signals. Hairline
borders. Square corners.

By [thebuilder](https://thebuilder.dk). Install the full system or add components
one at a time.

## Using it

Register the namespace once in your `components.json`:

```json
{
  "registries": {
    "@afterglow": "https://afterglow.thebuilder.dk/r/{name}.json"
  }
}
```

Then install any component by name. Registry dependencies resolve automatically:

```sh
npx shadcn@latest add @afterglow/button @afterglow/scanlines
```

Or start a project on the whole system:

```sh
npx shadcn@latest init https://afterglow.thebuilder.dk/r/terminal.json
```

Direct URL installs work too, but do not resolve dependencies between registry
items.

## What is in it

| | |
| --- | --- |
| `theme` | Tokens, typography, motion and CRT effects. Dark theme only. |
| Primitives | `accordion` `alert` `alert-dialog` `avatar` `badge` `breadcrumb` `button` `card` `checkbox` `collapsible` `command` `dialog` `dropdown-menu` `empty` `input` `input-otp` `kbd` `label` `pagination` `popover` `progress` `radio-group` `resizable` `scroll-area` `select` `separator` `sheet` `skeleton` `slider` `spinner` `switch` `table` `tabs` `textarea` `toast` `toggle` `toggle-group` `tooltip` |
| Terminal | `alarm-button` `boot-log` `connector` `eyebrow` `glyph` `led` `prompt` `scanlines` `screen` `terminal-window` |
| Whole | `console` (a composed page), `terminal` (a style that installs the lot) |

The primitives are shadcn components redrawn for Afterglow and built on
[Base UI](https://base-ui.com). Two API details matter when moving from a Radix
component.

- `asChild` is `render`. `<Button render={<Link href="/x" />}>Go</Button>`
  instead of `<Button asChild><Link href="/x">Go</Link></Button>`.
- State lands on `data-open` / `data-closed` / `data-checked` rather than
  `data-state="open"`, so style hooks are written `data-open:`.

The theme defines the variables used by stock shadcn components. Install one
from `ui.shadcn.com` and it inherits Afterglow's square corners and phosphor
palette.

Every item has a page at `/c/<name>` with a live example, install commands,
exports, composition, Afterglow-specific props and full source. The index is a
gallery of all 51 items. Press `⌘K` from either view to search the docs.

## For agents

| | |
| --- | --- |
| `/llms.txt` | The annotated index. Start here. |
| `/llms-full.txt` | Every page in one file, without the component sources. |
| `/c/<name>.md` | One page, with the source the CLI would install. |
| `/r/<name>.json` | The registry item itself, file contents included. |

## Publishing to the shadcn directory

The listing at [ui.shadcn.com/docs/directory](https://ui.shadcn.com/docs/directory)
is a file in shadcn's own repository, not something this project serves. To be
added, open a pull request on `shadcn-ui/ui` appending this to
`apps/v4/registry/directory.json`, then run `pnpm validate:registries` there:

```json
  {
    "name": "@afterglow",
    "homepage": "https://afterglow.thebuilder.dk",
    "url": "https://afterglow.thebuilder.dk/r/{name}.json",
    "description": "Old-school terminal UI for the modern web. Phosphor green on unlit glass, hairline borders, no corner radius, built on Base UI.",
    "author": "thebuilder",
    "logo": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 32 32\" fill=\"currentColor\"><title>afterglow</title><path d=\"M6.45 5.9L18.23 16L6.45 26.1L3 22.07L10.09 16L3 9.93Z\"/><path d=\"M18.4 20.24L29 20.24L29 24.48L18.4 24.48Z\"/></svg>"
  }
```

The logo is `assets/registry-logo.svg`. It uses the favicon mark without its
background, and the chevron is a filled outline. The directory renders each
entry with `grayscale`, forces the SVG to 32px and overrides `fill` with the page
foreground. A stroked path receives no colour there, a background rectangle
becomes a solid block and a non-square viewBox gets squashed.

What the directory checks before it will take an entry:

| | |
| --- | --- |
| Open source | MIT, in `LICENSE`. A public repo with no licence is not open source. |
| Publicly reachable | `https://afterglow.thebuilder.dk/r/{name}.json` answers 200. |
| Valid namespace | `@afterglow` matches `^@[a-zA-Z0-9][a-zA-Z0-9_-]*$`. |
| `{name}` placeholder | Required in the `url` field. |
| Flat layout | `registry.json` and every item live at the root of `/r/`. |
| No `content` in source | `registry.json` lists file paths; `shadcn build` inlines the content into `/r/`. |

## Working on it

```sh
pnpm check      # lint, types, dead code, registry, build
```

The parts, if one of them is what you want:

| | |
| --- | --- |
| `pnpm dev` | Rebuilds the registry, then runs the documentation site. |
| `pnpm lint` | Ultracite, over Biome. `pnpm fix` writes what it can. |
| `pnpm typecheck` | `tsc --noEmit`. |
| `pnpm dead` | fallow: unused files, exports and dependencies. |
| `pnpm health` | fallow: complexity, duplication, hotspots. Advisory. |
| `pnpm registry:build` | Checks the docs against the source, renders the theme, then `shadcn build` into `public/r/`. |

### The theme is generated

`registry/terminal/theme.mjs` is the only place the tokens are written down.
`scripts/build-globals.mjs` renders it into `app/globals.css` and the `theme`
item in `registry.json`. Both outputs are committed and generated. This keeps
the documentation site on the same token values as installed projects.

### The gallery is generated

Every card, item page and install line comes from `registry.json`.
`components/examples/` is keyed by item name and can provide separate examples
for each variant. The page throws if a registry item has no example.

### The animations are the registry's own

There is no `tw-animate-css`. Every entrance and exit keyframe lives in
`theme.mjs`. Afterglow's transitions use stepped timing.
