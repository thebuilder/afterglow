# afterglow

A [shadcn registry](https://ui.shadcn.com/docs/registry) for the old-school
terminal look. Phosphor green on unlit glass, a pink signal for whatever is
actually happening, hairline borders and no corner radius anywhere.

By [thebuilder](https://thebuilder.dk). A whole design system, cut into pieces
you can install one at a time.

## Using it

Register the namespace once in your `components.json`:

```json
{
  "registries": {
    "@afterglow": "https://afterglow.thebuilder.dk/r/{name}.json"
  }
}
```

Then install the theme, and whatever else you want:

```sh
npx shadcn@latest add @afterglow/theme
npx shadcn@latest add @afterglow/button @afterglow/scanlines
```

Or start a project on the whole system:

```sh
npx shadcn@latest init https://afterglow.thebuilder.dk/r/terminal.json
```

The theme comes first. Everything else is drawn with its tokens and renders
unstyled without it.

Installing by bare URL works too, but the dependencies between items in this
registry are written as `@afterglow/...`, so without the namespace the CLI
cannot follow them.

## What is in it

| | |
| --- | --- |
| `theme` | Palette, type, motion, glass. One palette, no light mode. |
| Primitives | `accordion` `alert` `alert-dialog` `avatar` `badge` `breadcrumb` `button` `card` `checkbox` `collapsible` `command` `dialog` `dropdown-menu` `empty` `input` `input-otp` `kbd` `label` `pagination` `popover` `progress` `radio-group` `resizable` `scroll-area` `select` `separator` `sheet` `skeleton` `slider` `spinner` `switch` `table` `tabs` `textarea` `toast` `toggle` `toggle-group` `tooltip` |
| Terminal | `alarm-button` `boot-log` `connector` `eyebrow` `glyph` `led` `prompt` `scanlines` `screen` `terminal-window` |
| Whole | `console` (a composed page), `terminal` (a style that installs the lot) |

The primitives are shadcn's own components redrawn, built on
[Base UI](https://base-ui.com) rather than Radix, which is the direction shadcn
itself is moving. Two consequences worth knowing before you install.

- `asChild` is `render`. `<Button render={<Link href="/x" />}>Go</Button>`
  instead of `<Button asChild><Link href="/x">Go</Link></Button>`.
- State lands on `data-open` / `data-closed` / `data-checked` rather than
  `data-state="open"`, so style hooks are written `data-open:`.

Because the theme defines every variable stock shadcn names, a component
installed from `ui.shadcn.com` into a project running this theme comes out
sharp-cornered and phosphor-green without being touched.

Every item has its own page at `/c/<name>`: the component working, both ways to
install it, the parts it exports and how they nest, the props afterglow adds on
top of Base UI, and its full source. The index is a gallery of all 51, and
either page opens the palette with `⌘K`.

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

The logo is `assets/registry-logo.svg`, kept in this repo so the two stay in
step. It is the favicon's mark with the background dropped and the chevron
converted from a stroke to a filled outline, because the directory renders each
entry with `grayscale`, forces the SVG to 32px, and overrides `fill` to the page
foreground. A stroked path picks up no colour there, a background rectangle
becomes a solid block, and a non-square viewBox gets squashed.

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
`scripts/build-globals.mjs` renders it into `app/globals.css` and into the
`theme` item in `registry.json`. Both outputs are committed and neither is
edited by hand, because the documentation site has to be painted with the same
values it hands out. Otherwise the demo is a picture of something else.

### The gallery is generated

Every card on the site, every item page and every install line is read out of
`registry.json`. `components/examples/` is keyed by item name and holds a list
of named examples per item, so a component can show its variants separately. An
item that ships without an example throws on the page it was meant to appear on,
which is deliberate.

### The animations are the registry's own

There is no `tw-animate-css`. Every entrance and exit is a keyframe in
`theme.mjs`, because a registry that claims to be the whole system in one
install should not quietly need an animation library. The house entrance is
stepped rather than eased anyway.
