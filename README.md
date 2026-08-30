# Afterglow

Old-school terminal UI for the modern web.

Afterglow is a [shadcn registry](https://ui.shadcn.com/docs/registry) with a shared CRT-inspired theme, Base UI components, and terminal-specific building blocks. Install the full system or add only the parts you need. The shadcn CLI copies the source into your project, so the components stay yours.

- [Documentation](https://afterglow.thebuilder.dk/docs)
- [Component gallery](https://afterglow.thebuilder.dk/components)
- [Live site](https://afterglow.thebuilder.dk)

## Quick start

Start a project with the complete Afterglow preset:

```bash
npx shadcn@latest init https://afterglow.thebuilder.dk/r/terminal.json
```

This installs the theme, interface primitives, terminal components, and composed blocks.

## Add individual components

For an existing shadcn project, register the Afterglow namespace in `components.json`:

```json
{
  "registries": {
    "@afterglow": "https://afterglow.thebuilder.dk/r/{name}.json"
  }
}
```

Then install one or more components:

```bash
npx shadcn@latest add @afterglow/button @afterglow/scanlines
```

Registry dependencies resolve automatically, including the shared theme and required packages.

## What you get

**Interface primitives** such as buttons, dialogs, inputs, tables, tabs, selects, tooltips, commands, and other familiar UI components, redrawn for Afterglow and built on [Base UI](https://base-ui.com).

**Terminal components** including screens, scanlines, prompts, boot logs, status lights, shell layouts, connectors, and terminal window chrome.

**A shared theme** with square geometry, stepped motion, CRT effects, semantic color tokens, and eight phosphor presets: `green`, `orange`, `yellow`, `cyan`, `blue`, `magenta`, `red`, and `grey`.

Browse the [component gallery](https://afterglow.thebuilder.dk/components) for live examples and install commands.

## Phosphor presets

Green is the default. Set `data-phosphor` on the root element to switch palette:

```html
<html data-phosphor="orange">
```

The preset updates the phosphor ramp together with related panels, borders, focus states, and semantic colors. Afterglow only reads the attribute, so you can manage it with your own state or theme library.

See the [theming guide](https://afterglow.thebuilder.dk/docs/theming) for `next-themes`, token overrides, typography, and the `typeset` utility.

## shadcn and Base UI

Afterglow uses the shadcn registry and CLI for installation. It is not a shadcn runtime layer: the CLI copies component source into your project.

The theme uses standard shadcn semantic variables, so stock components installed from `ui.shadcn.com` can inherit the Afterglow palette and square geometry.

Afterglow's own interactive primitives are built on Base UI, so two conventions apply:

- Compose with Base UI's `render` prop.
- Read state from `data-open`, `data-closed`, and `data-checked`.

See [Getting started](https://afterglow.thebuilder.dk/docs) and [Installation](https://afterglow.thebuilder.dk/docs/installation) for the full setup.

## Local development

```bash
pnpm install
pnpm dev
```

Run the project checks before submitting changes:

```bash
pnpm check
```

MIT licensed. Built by [thebuilder](https://thebuilder.dk).
