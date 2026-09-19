import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

// Ultracite owns the rules. Everything below is either a fact about this
// repository or a rule this repository has a stated reason to disagree with.
export default defineConfig({
  extends: [core, react, next],
  ignorePatterns: core.ignorePatterns,
  // @shadcn/lint reads components.json for the component alias and the theme,
  // so it needs no settings. Its rules are in the `shadcn/` block below. The
  // contracts there are design decisions about what a page may change on a
  // part and what the part keeps for itself.
  jsPlugins: ["@shadcn/lint"],
  rules: {
    // shadcn ships its components as function declarations, and the payload
    // stays in that shape so a diff against upstream reads as a diff. The
    // site follows the payload rather than keeping two conventions.
    "func-style": "off",
    "react/function-component-definition": "off",
    // A page is written top down: the component first, the parts it is made
    // of below it. Hoisting makes that legal for declarations, and a constant
    // read inside a function body is read at call time, not at parse time.
    "no-use-before-define": ["error", { functions: false, variables: false }],
    // `theme.mjs` holds keyframes, and a lexical sort puts `100%` before
    // `22%`. Objects there are in the order the CSS reads.
    "sort-keys": "off",
    // fallow health already gauges complexity, with the thresholds stated in
    // `.fallowrc.jsonc`. Two gauges with two counting rules is one too many.
    complexity: "off",
    // Each regex here has one or two captures and sits beside the constant
    // that names them. A name inside the pattern would repeat that constant.
    "prefer-named-capture-group": "off",
    // A promise chain in an event handler reads top to bottom, and nothing
    // above it can await. An async callback nobody awaits hides the same
    // sequence behind a promise no caller reads.
    "promise/prefer-await-to-then": "off",
    // The animation components (`boot-log`, `typewriter`, `scramble`) set the
    // finished state inside the effect that would otherwise drive the
    // animation, when reduced motion is on or the text changes. One effect
    // owning both halves is the design.
    "react/set-state-in-effect": "off",
    // `ToggleGroup` and `ChartContainer` build a two-key context value from
    // the props that change it, the way shadcn's own components do.
    "react/jsx-no-constructed-context-values": "off",
    // `react/todo` reports where the React Compiler declined to reorder an
    // expression. It describes the compiler's limits and asks nothing of the
    // code.
    "react/todo": "off",
    // `<output>` is a form-associated element and takes the form semantics
    // with it. `role="status"` on a `div` is what shadcn ships.
    "jsx-a11y/prefer-tag-over-role": "off",
    // An id handed to `querySelector` needs `CSS.escape` first;
    // `getElementById` takes it as it is.
    "unicorn/prefer-query-selector": "off",

    // ── shadcn ──────────────────────────────────────────────────────────
    // A page places a part and the part draws itself. Layout belongs to the
    // page, and appearance comes from a variant. The contracts open one more category
    // where a part is a box the page fills, or a hook the page is meant to
    // set. The registry itself is exempt further down, since it is the system.
    "shadcn/no-restyle": [
      "error",
      {
        allow: ["layout"],
        contracts: [
          {
            // Base UI triggers and the Collapsible root render whatever the
            // caller gives them and carry no look of their own, so the look
            // is the caller's. `ease-terminal` and the `tracking-terminal`
            // scale are theme utilities the class grammar cannot place.
            pattern:
              "^(AlertDialog|Collapsible|ContextMenu|Dialog|DropdownMenu|HoverCard|Popover|Sheet|Tooltip)Trigger$|^Collapsible$",
            allow: [
              "layout",
              "color",
              "typography",
              "spacing",
              "shape",
              "effects",
              "motion",
              "ease-terminal",
              "tracking-terminal",
              "tracking-terminal-*",
            ],
          },
          {
            // The page fills a content box, so it sets the gap, the prose
            // size and colour, and whether the box animates in. The surface itself,
            // border, background and shadow, stays with the part.
            pattern: "(Content|Panel|Empty)$",
            allow: [
              "layout",
              "spacing",
              "typography",
              "motion",
              "text-color",
              "ease-terminal",
              "tracking-terminal",
              "tracking-terminal-*",
            ],
          },
          {
            // A header, footer or body is a strip the page stacks, and a
            // divider above or below it is the page's call.
            pattern: "(Header|Footer|Body)$",
            allow: [
              "layout",
              "spacing",
              "border-t",
              "border-b",
              "border-color",
            ],
          },
          {
            // A title is prose. Its size, weight and colour follow where it
            // sits, the way a card title and a sheet title differ.
            pattern: "(Title|Description)$",
            allow: [
              "layout",
              "spacing",
              "typography",
              "text-color",
              "tracking-terminal",
              "tracking-terminal-*",
            ],
          },
          {
            // A cell is data. Emphasis on a value is the table's content,
            // and `is-numeric` is the hook the Table part styles.
            pattern: "^Table(Cell|Head|Row)$",
            allow: ["layout", "typography", "text-color", "is-numeric"],
          },
          {
            // A viewport is framed by the page that places it.
            pattern: "^(ScrollArea|ResizablePanelGroup)$",
            allow: ["layout", "shape", "border-color", "bg-color"],
          },
          {
            // The parts of one field are spaced against each other, and the
            // addon variants read `border-t` and `border-b` off the addon.
            pattern: "^InputGroup(Addon|Button|Input|Text|Textarea)$",
            allow: ["layout", "spacing", "border-t", "border-b"],
          },
          {
            // A text addon is prose beside the field, so its size follows.
            pattern: "^InputGroupText$",
            allow: ["layout", "spacing", "typography"],
          },
          {
            // The spinner's cells are spaced for the size the caller sets,
            // and the fallback's type follows the avatar's size.
            pattern: "^Spinner$",
            allow: ["layout", "spacing"],
          },
          {
            pattern: "^AvatarFallback$",
            allow: ["layout", "typography"],
          },
          {
            // `site-search-dialog` is the hook `app/site.css` uses to size the
            // search dialog on small screens.
            pattern: "^CommandDialog$",
            allow: ["layout", "site-search-dialog"],
          },
        ],
      },
    ],
    "shadcn/no-raw-colors": "error",
    // Layout values are measurements of the page. `transition-[height]` is
    // how a Base UI panel animates, and Tailwind has no utility for it.
    "shadcn/no-arbitrary-values": [
      "error",
      { allow: ["layout", "transition-[height]"] },
    ],
    "shadcn/no-inline-styles": "error",
    // The classes below are declared in `app/site.css`, which the site loads
    // beside the theme, or are hooks a part styles from the inside:
    // `is-numeric` by Table and `toaster` by sonner.
    "shadcn/no-unknown-classes": [
      "error",
      {
        allow: [
          "composition-tree",
          "docs-sidebar",
          "hero-shell",
          "is-numeric",
          "list-square",
          "site-header",
          "site-search-dialog",
          "toaster",
        ],
      },
    ],
    "shadcn/require-static-classes": "error",
  },
  // File-wide disagreements live here rather than as disable comments,
  // because most of these files are payload: an inline suppression would be
  // shipped into somebody else's repository, naming a linter they may not run.
  overrides: [
    {
      // The registry is the design system, so the rules that keep a page from
      // restyling it do not apply to it. A part draws itself with whatever
      // value it needs, and the dynamic values it carries (a mask from the
      // progress value, a delay per spinner cell) travel in `style`.
      files: ["registry/terminal/**"],
      rules: {
        "shadcn/no-arbitrary-values": "off",
        "shadcn/no-inline-styles": "off",
        "shadcn/no-restyle": "off",
        "shadcn/require-static-classes": "off",
      },
    },
    {
      // Satori draws the OG images and the icon from inline styles; there is
      // no stylesheet on that side.
      files: ["lib/og.tsx", "app/**/{opengraph-image,apple-icon,icon}.tsx"],
      rules: {
        "shadcn/no-inline-styles": "off",
      },
    },
    {
      // A click on an addon's padding focuses the field, the way a click on a
      // label would. It is a mouse shortcut to a control the keyboard already
      // reaches by tabbing, so there is no key handler to add and the addon is
      // right to stay out of the tab order.
      files: ["registry/terminal/ui/input-group.tsx"],
      rules: {
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "jsx-a11y/no-static-element-interactions": "off",
      },
    },
    {
      // One re-export, so `toast` and `Toaster` arrive from the same module and
      // a consumer does not have to know that half of this component is sonner.
      // A barrel is a file that re-exports a directory; this is a convenience.
      files: ["registry/terminal/ui/toast.tsx"],
      rules: {
        "oxc/no-barrel-file": "off",
      },
    },
    {
      // These wrap an element and pass `children` through a spread, so the
      // content the rule looks for arrives at the call site.
      files: ["mdx-components.tsx", "registry/terminal/ui/pagination.tsx"],
      rules: {
        "jsx-a11y/anchor-has-content": "off",
        "jsx-a11y/heading-has-content": "off",
      },
    },
    {
      // The label is the menu item's children. Base UI renders them into the
      // anchor handed to `render`, which is where the rule looks.
      files: ["components/docs/page-actions.tsx"],
      rules: {
        "jsx-a11y/control-has-associated-label": "off",
      },
    },
  ],
});
