/**
 * The theme, and the only place its numbers are written down.
 *
 * `scripts/build-globals.mjs` renders this into two artefacts: `app/globals.css`,
 * which is what this site is painted with, and the `theme` item in
 * `registry.json`, which is what `shadcn add` merges into somebody else's
 * stylesheet. Editing either of those by hand puts the registry and the site it
 * documents out of step, and the drift is invisible until someone installs.
 *
 * The palette is one palette. A phosphor tube has no light mode, so `light` and
 * `dark` carry the same values and toggling a consumer's theme class is a no-op
 * rather than a second, worse design nobody asked for.
 */

/** The tube's own colours, before they are given interface jobs below. */
const PALETTE = {
  /* The glass with nothing on it. Not black: a tube that is off is still glass. */
  void: "#05090a",
  panel: "#0b1515",
  "panel-raised": "#091212",
  "panel-sunken": "#081210",

  /* The beam. `phosphor` is the reading colour, `bright` is where it blooms,
     `dim` is the same green far enough down to read as furniture. */
  phosphor: "#86fadd",
  "phosphor-bright": "#d9ffef",
  "phosphor-dim": "#4d8477",

  /* The one warm colour, and the reason the interface has a pulse. Used for
     the thing that is happening, never for the thing that is merely present. */
  signal: "#ff5b82",
  "signal-soft": "#e84970",

  /* Category colours. They exist so a legend can have more than two entries
     without inventing a hue on the spot. */
  amber: "#ffbc57",
  violet: "#b890ff",
  azure: "#8dbdf5",
  ember: "#ff5a65",

  ink: "#e9f6f1",
  "ink-muted": "#87a39d",

  /* Every border in the system is the beam at low power, so a hairline reads as
     something the tube drew rather than as a box somebody added. */
  line: "rgb(132 255 224 / 0.22)",
  "line-strong": "rgb(132 255 224 / 0.55)",
};

/**
 * shadcn's variable names, pointed at the palette above.
 *
 * This is the whole compatibility story: a stock shadcn component dropped into a
 * project running this theme comes out sharp-cornered and phosphor-green without
 * being touched, because every colour it names is defined here.
 */
const SEMANTIC = {
  background: PALETTE.void,
  foreground: PALETTE.ink,

  card: PALETTE.panel,
  "card-foreground": PALETTE.ink,
  popover: PALETTE["panel-raised"],
  "popover-foreground": PALETTE.ink,

  /* Primary is the beam, not the accent. The interface is green; the pink is an
     event. Making pink primary would put an alarm on every submit button. */
  primary: PALETTE.phosphor,
  "primary-foreground": PALETTE.void,

  secondary: "#10201f",
  "secondary-foreground": PALETTE.phosphor,

  muted: "#0d1b1a",
  "muted-foreground": PALETTE["ink-muted"],

  /* shadcn spends `accent` on hover fills, so it has to be a wash rather than a
     colour. The pink lives in `--signal` and is asked for by name. */
  accent: "#17403a",
  "accent-foreground": PALETTE["phosphor-bright"],

  destructive: PALETTE.ember,
  "destructive-foreground": "#ffffff",

  border: PALETTE.line,
  input: PALETTE.line,
  ring: PALETTE["phosphor-bright"],

  /* Sharp, and sharp everywhere. The derived radii below are pinned to zero
     rather than computed off this, so `rounded-xl` on a stock component cannot
     quietly reintroduce a corner. */
  radius: "0rem",

  "chart-1": PALETTE.phosphor,
  "chart-2": PALETTE.signal,
  "chart-3": PALETTE.amber,
  "chart-4": PALETTE.azure,
  "chart-5": PALETTE.violet,

  sidebar: PALETTE["panel-raised"],
  "sidebar-foreground": PALETTE.ink,
  "sidebar-primary": PALETTE.phosphor,
  "sidebar-primary-foreground": PALETTE.void,
  "sidebar-accent": "#17403a",
  "sidebar-accent-foreground": PALETTE["phosphor-bright"],
  "sidebar-border": PALETTE.line,
  "sidebar-ring": PALETTE["phosphor-bright"],
};

/** The raw tokens, exposed under their own names for components to reach for. */
const RAW = Object.fromEntries(
  Object.entries(PALETTE).map(([key, value]) => [key, value]),
);

/**
 * `@theme inline`, which is to say everything that becomes a Tailwind utility.
 *
 * `inline` matters: the values are `var()` references, and without it Tailwind
 * would resolve them once at build time and a consumer overriding `--signal` in
 * their own stylesheet would find `bg-signal` unchanged.
 */
const THEME = {
  "font-sans": '"Helvetica Neue", Inter, Arial, sans-serif',
  "font-mono":
    '"SFMono-Regular", "IBM Plex Mono", "Cascadia Mono", Consolas, monospace',

  ...Object.fromEntries(
    Object.keys(PALETTE).map((key) => [`color-${key}`, `var(--${key})`]),
  ),

  ...Object.fromEntries(
    Object.keys(SEMANTIC)
      .filter((key) => key !== "radius")
      .map((key) => [`color-${key}`, `var(--${key})`]),
  ),

  "radius-sm": "0px",
  "radius-md": "0px",
  "radius-lg": "0px",
  "radius-xl": "0px",
  "radius-2xl": "0px",

  /* Leaves immediately, settles late. One curve for the whole system: a set of
     entrances that each ease differently reads as a set of unrelated events. */
  "ease-terminal": "cubic-bezier(0.2, 0.7, 0.3, 1)",

  "shadow-glow": "0 0 18px rgb(134 250 221 / 0.18)",
  "shadow-glow-strong":
    "0 0 34px 2px rgb(134 250 221 / 0.4), inset 0 0 0 1px rgb(134 250 221 / 0.2)",
  "shadow-glow-signal": "0 0 34px 2px rgb(255 91 130 / 0.55)",
  "shadow-panel":
    "0 2rem 5rem rgb(0 0 0 / 0.7), 0 0 50px rgb(134 250 221 / 0.08)",

  "text-shadow-phosphor": "0 0 8px rgb(134 250 221 / 0.35)",
  "text-shadow-signal": "0 0 10px rgb(255 91 130 / 0.45)",

  /* Named so a component can ask for the motion rather than restate its timing.
     `steps()` on the caret and the boot log is deliberate: a cursor that fades
     is a cursor drawn by something other than a terminal. */
  "animate-caret": "terminal-caret 1.1s steps(1) infinite",
  "animate-led": "terminal-led 2.5s infinite",
  "animate-sweep": "terminal-sweep 1.15s ease-in-out infinite",
  "animate-alarm": "terminal-alarm 2.4s var(--ease-terminal) infinite",
  "animate-type": "terminal-type 560ms steps(24) both",
  "animate-line-in": "terminal-line-in 420ms var(--ease-terminal) both",
  "animate-beam": "terminal-beam 1s var(--ease-terminal) both",
  "animate-open": "terminal-open 180ms steps(4, end)",
  /* One lap of a 3x3 grid in eight hops. Each cell runs the same decay and the
     spinner phase-shifts them, so what travels is a lit head with a tail. */
  "animate-pixel": "terminal-pixel 800ms linear infinite",

  /**
   * Entrances and exits for everything Radix mounts and unmounts.
   *
   * Hand-rolled rather than pulled from tw-animate-css, for two reasons. The
   * registry claims to be the whole system in one install, and an animation
   * library it silently needs makes that untrue. And the house entrance is
   * stepped: a panel that scales up smoothly is a sheet of paper, and a screen
   * that has just been switched to is either off or on.
   *
   * The closing halves matter as much as the opening ones. Radix defers unmount
   * on a running CSS *animation*, not a transition, so an element with no close
   * animation vanishes rather than leaves.
   */
  "animate-fade-in": "terminal-fade-in 140ms ease-out",
  "animate-fade-out": "terminal-fade-out 120ms ease-in forwards",
  "animate-close": "terminal-close 120ms steps(3, end) forwards",
  "animate-slide-in-right":
    "terminal-slide-in-right 220ms var(--ease-terminal)",
  "animate-slide-in-left": "terminal-slide-in-left 220ms var(--ease-terminal)",
  "animate-slide-in-top": "terminal-slide-in-top 220ms var(--ease-terminal)",
  "animate-slide-in-bottom":
    "terminal-slide-in-bottom 220ms var(--ease-terminal)",
  "animate-slide-out-right":
    "terminal-slide-out-right 170ms var(--ease-terminal) forwards",
  "animate-slide-out-left":
    "terminal-slide-out-left 170ms var(--ease-terminal) forwards",
  "animate-slide-out-top":
    "terminal-slide-out-top 170ms var(--ease-terminal) forwards",
  "animate-slide-out-bottom":
    "terminal-slide-out-bottom 170ms var(--ease-terminal) forwards",
};

/**
 * Every `--animate-*` token, as a selector list.
 *
 * Derived rather than written out. The hand-kept version was already one edit
 * behind by the time there were ten animations, and an animation missing from
 * that list is one that keeps running for somebody who asked the operating
 * system to stop them.
 */
const REDUCED_MOTION_SELECTOR = Object.keys(THEME)
  .filter((key) => key.startsWith("animate-"))
  .map((key) => `.${key}`)
  .join(", ");

/**
 * Everything that is not a variable: the base layer, the keyframes the tokens
 * above refer to, and three utilities for the glass.
 */
const CSS = {
  "@layer base": {
    ":root": {
      /* Scrollbars, form controls and the canvas the browser paints before the
         first frame. Without it there is a white flash on load, which on this
         palette is the one mistake the eye cannot miss. */
      "color-scheme": "dark",
      /* The thumb in the beam's colour, on no track. A default scrollbar down
         the side of a phosphor interface is the one piece of the operating
         system the design does not get to draw. */
      "scrollbar-color": "var(--phosphor-dim) transparent",
      "scrollbar-width": "thin",
    },
    /**
     * The gutter is always there, whether the page scrolls or not.
     *
     * Without it, moving from a short page to a long one takes the scrollbar's
     * width out of the viewport and everything centred shifts sideways. The
     * fixed scanline layer shifts with it, so the whole picture jumps rather
     * than just the text.
     *
     * `scrollbar-gutter` is the property built for this and reserves the space
     * without painting a dead track; `overflow-y: scroll` is the floor for
     * anything that does not support it yet.
     */
    html: {
      "overflow-y": "scroll",
      "scrollbar-gutter": "stable",
    },
    "*": {
      "border-color": "var(--border)",
    },
    body: {
      background: "var(--background)",
      color: "var(--foreground)",
      "font-family": "var(--font-sans)",
      "-webkit-font-smoothing": "antialiased",
      "text-rendering": "optimizeLegibility",
    },
    /* Selection is the one place the pink is unavoidable, and it is the right
       place: highlighting is something you did, not something the page did. */
    "::selection": {
      background: "var(--signal)",
      color: "#fff",
    },
    /* A ring rather than a glow. Focus has to be legible over a bright scene,
       and `:where()` keeps this at zero specificity so any component can take
       the outline off and draw its own. */
    ":where(a, button, input, textarea, select, summary, [tabindex]):focus-visible":
      {
        outline: "2px solid var(--phosphor-bright)",
        "outline-offset": "3px",
      },
  },

  "@keyframes terminal-caret": { "50%": { opacity: "0" } },
  "@keyframes terminal-led": { "50%": { opacity: "0.35" } },
  "@keyframes terminal-sweep": {
    from: { transform: "translateX(-110%)" },
    /* 300%: a segment a third of the track wide clears the far edge three
       widths out, so the light leaves rather than stopping at the edge. */
    to: { transform: "translateX(300%)" },
  },
  /* Two flashes and a rest, which is what a warning lamp does and what a steady
     sine does not: an even fade reads as breathing, and breathing is decoration. */
  "@keyframes terminal-alarm": {
    "0%, 100%": {
      "border-color": "transparent",
      "box-shadow": "0 0 0 rgb(255 91 130 / 0)",
    },
    "8%": {
      "border-color": "rgb(255 184 202 / 0.95)",
      "box-shadow":
        "0 0 34px 2px rgb(255 91 130 / 0.55), inset 0 0 0 3rem rgb(255 91 130 / 0.3)",
    },
    "18%": {
      "border-color": "transparent",
      "box-shadow": "0 0 0 rgb(255 91 130 / 0)",
    },
    "28%": {
      "border-color": "rgb(255 184 202 / 0.95)",
      "box-shadow":
        "0 0 34px 2px rgb(255 91 130 / 0.55), inset 0 0 0 3rem rgb(255 91 130 / 0.3)",
    },
    "42%": {
      "border-color": "transparent",
      "box-shadow": "0 0 0 rgb(255 91 130 / 0)",
    },
  },
  /* Both ends are stated: `clip-path` has no interpolable initial value to fall
     back on, so a one-sided keyframe animates from nothing and shows nothing. */
  "@keyframes terminal-type": {
    from: { "clip-path": "inset(-0.4em 100% -0.4em -0.1em)" },
    to: { "clip-path": "inset(-0.4em -0.15em -0.4em -0.1em)" },
  },
  "@keyframes terminal-line-in": {
    from: {
      opacity: "0",
      transform: "translateY(0.4em)",
      "clip-path": "inset(-0.25em -0.12em 100% -0.06em)",
    },
    to: {
      opacity: "1",
      transform: "none",
      "clip-path": "inset(-0.25em -0.12em -0.25em -0.06em)",
    },
  },
  /* One pass of the beam down a panel that has just come up to power. */
  "@keyframes terminal-beam": {
    from: { opacity: "0", transform: "translateY(-58%)" },
    "30%": { opacity: "1" },
    to: { opacity: "0", transform: "translateY(58%)" },
  },
  "@keyframes terminal-open": {
    from: { opacity: "0", transform: "scale(0.97) translateY(0.7rem)" },
  },
  /**
   * Four brightness levels, held flat between the steps.
   *
   * A smooth fade would be a phosphor cell dimming continuously, which is not
   * what a character-cell display does: it has a handful of intensities and
   * picks one. The plateaus are what make the tail read as three separate lit
   * pixels behind the head rather than a smear.
   */
  "@keyframes terminal-pixel": {
    /* The steps land on eighths, because that is where the cells are: with the
       ramps a whole percent wide the phase offsets fell inside them and a tail
       pixel could be caught at an interpolated brightness. A hundredth of a
       percent is 0.08ms, which is a jump. */
    "0%, 12.49%": { opacity: "1" },
    "12.5%, 24.99%": { opacity: "0.62" },
    "25%, 37.49%": { opacity: "0.34" },
    "37.5%, 100%": { opacity: "0.16" },
  },
  "@keyframes terminal-fade-in": { from: { opacity: "0" } },
  "@keyframes terminal-fade-out": { to: { opacity: "0" } },
  "@keyframes terminal-close": {
    to: { opacity: "0", transform: "scale(0.98)" },
  },
  "@keyframes terminal-slide-in-right": {
    from: { transform: "translateX(100%)" },
  },
  "@keyframes terminal-slide-in-left": {
    from: { transform: "translateX(-100%)" },
  },
  "@keyframes terminal-slide-in-top": {
    from: { transform: "translateY(-100%)" },
  },
  "@keyframes terminal-slide-in-bottom": {
    from: { transform: "translateY(100%)" },
  },
  "@keyframes terminal-slide-out-right": {
    to: { transform: "translateX(100%)" },
  },
  "@keyframes terminal-slide-out-left": {
    to: { transform: "translateX(-100%)" },
  },
  "@keyframes terminal-slide-out-top": {
    to: { transform: "translateY(-100%)" },
  },
  "@keyframes terminal-slide-out-bottom": {
    to: { transform: "translateY(100%)" },
  },

  /**
   * The glass.
   *
   * Two densities and a vignette, kept as utilities rather than baked into a
   * component so they can be laid over a canvas, a card or a whole page. The
   * multiply blend is what stops them washing a dark panel grey: the lines
   * darken what is under them instead of adding a film on top.
   */
  "@utility scanlines": {
    "background-image":
      "repeating-linear-gradient(to bottom, transparent 0 2px, rgb(0 0 0 / 0.16) 2px 3px)",
    "mix-blend-mode": "multiply",
  },
  "@utility scanlines-soft": {
    "background-image":
      "repeating-linear-gradient(to bottom, transparent 0 3px, rgb(0 0 0 / 0.09) 3px 4px)",
    "mix-blend-mode": "multiply",
  },
  "@utility vignette": {
    "background-image":
      "radial-gradient(130% 100% at 50% 50%, transparent 52%, rgb(0 0 0 / 0.55) 100%)",
  },

  /**
   * Nobody asked for a light flashing at them, and a caret blinking through a
   * long read is the same imposition at lower amplitude. Both hold a lit frame
   * so the interface still reads as powered rather than as paused.
   */
  "@media (prefers-reduced-motion: reduce)": {
    [REDUCED_MOTION_SELECTOR]: {
      animation: "none !important",
    },
  },
};

export const cssVars = {
  theme: THEME,
  light: { ...RAW, ...SEMANTIC },
  dark: { ...RAW, ...SEMANTIC },
};

export const css = CSS;
