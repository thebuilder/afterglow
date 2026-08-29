// Source for the generated globals and the theme entry in registry.json.
const PALETTE = {
  amber: "#ffbc57",
  azure: "#8dbdf5",
  ember: "#ff5a65",

  ink: "#e9f6f1",
  "ink-muted": "#87a39d",

  line: "rgb(132 255 224 / 0.22)",
  "line-strong": "rgb(132 255 224 / 0.55)",
  panel: "#0b1515",
  "panel-raised": "#091212",
  "panel-sunken": "#081210",

  phosphor: "#86fadd",
  "phosphor-bright": "#d9ffef",
  "phosphor-dim": "#4d8477",

  signal: "#ff5b82",
  "signal-soft": "#e84970",
  violet: "#b890ff",

  void: "#05090a",
};

const WINDOW_PALETTE = {
  "window-bevel-dark": "#5c7269",
  "window-bevel-light": "#e7eeeb",
  "window-border": "#263d38",
  "window-close": "#ff5d7f",
  "window-collapse": "#ffd45d",
  "window-control": "#2b443e",
  "window-footer": "#536c65",
  "window-footer-text": "#263e38",
  "window-grip": "#3d554f",
  "window-inset": "#d8e2de",
  "window-rule": "#1b302b",
  "window-surface": "#b6c4be",
  "window-text": "#09100f",
  "window-text-muted": "#38544d",
  "window-titlebar-dark": "#a2b4ac",
  "window-titlebar-light": "#c3cfca",
  "window-zoom": "#68d9b4",
};

const TOKENS = { ...PALETTE, ...WINDOW_PALETTE };

const SEMANTIC = {
  accent: "#17403a",
  "accent-foreground": PALETTE["phosphor-bright"],
  background: PALETTE.void,

  border: PALETTE.line,

  card: PALETTE.panel,
  "card-foreground": PALETTE.ink,

  "chart-1": PALETTE.phosphor,
  "chart-2": PALETTE.signal,
  "chart-3": PALETTE.amber,
  "chart-4": PALETTE.azure,
  "chart-5": PALETTE.violet,

  destructive: PALETTE.ember,
  "destructive-foreground": "#ffffff",
  foreground: PALETTE.ink,
  input: PALETTE.line,

  muted: "#0d1b1a",
  "muted-foreground": PALETTE["ink-muted"],
  popover: PALETTE["panel-raised"],
  "popover-foreground": PALETTE.ink,

  primary: PALETTE.phosphor,
  "primary-foreground": PALETTE.void,

  radius: "0rem",
  ring: PALETTE["phosphor-bright"],

  scrim: "rgb(1 5 6 / 0.72)",

  secondary: "#10201f",
  "secondary-foreground": PALETTE.phosphor,

  sidebar: PALETTE["panel-raised"],
  "sidebar-accent": "#17403a",
  "sidebar-accent-foreground": PALETTE["phosphor-bright"],
  "sidebar-border": PALETTE.line,
  "sidebar-foreground": PALETTE.ink,
  "sidebar-primary": PALETTE.phosphor,
  "sidebar-primary-foreground": PALETTE.void,
  "sidebar-ring": PALETTE["phosphor-bright"],
};

const RAW = Object.fromEntries(
  Object.entries(TOKENS).map(([key, value]) => [key, value])
);

const THEME = {
  "background-image-beam":
    "linear-gradient(180deg, transparent 44%, color-mix(in srgb, var(--phosphor) 16%, transparent) 50%, transparent 56%)",
  "background-image-window-grip":
    "repeating-linear-gradient(-45deg, transparent 0 2px, var(--window-grip) 2px 3px)",
  "background-image-window-titlebar":
    "repeating-linear-gradient(var(--window-titlebar-light) 0 1px, var(--window-titlebar-dark) 1px 3px)",
  "font-mono":
    '"SFMono-Regular", "IBM Plex Mono", "Cascadia Mono", Consolas, monospace',
  "font-sans": '"Helvetica Neue", Inter, Arial, sans-serif',

  "text-1xs": "0.6875rem",
  "text-2xs": "0.625rem",
  "text-3xs": "0.5625rem",
  "text-4xs": "0.55rem",
  "tracking-terminal": "0.1em",
  "tracking-terminal-2xl": "0.16em",
  "tracking-terminal-3xl": "0.18em",
  "tracking-terminal-lg": "0.12em",
  "tracking-terminal-sm": "0.08em",
  "tracking-terminal-xl": "0.14em",
  "tracking-terminal-xs": "0.06em",

  ...Object.fromEntries(
    Object.keys(TOKENS).map((key) => [`color-${key}`, `var(--${key})`])
  ),

  ...Object.fromEntries(
    Object.keys(SEMANTIC)
      .filter((key) => key !== "radius")
      .map((key) => [`color-${key}`, `var(--${key})`])
  ),
  "animate-alarm": "terminal-alarm 2.4s var(--ease-terminal) infinite",
  "animate-beam": "terminal-beam 1s var(--ease-terminal) both",

  "animate-caret": "terminal-caret 1.1s steps(1) infinite",
  "animate-close": "terminal-close 120ms steps(3, end) forwards",

  "animate-fade-in": "terminal-fade-in 140ms ease-out",
  "animate-fade-out": "terminal-fade-out 120ms ease-in forwards",
  "animate-led": "terminal-led 1.6s steps(2) infinite",
  "animate-line-in": "terminal-line-in 420ms var(--ease-terminal) both",
  "animate-open": "terminal-open 180ms steps(4, end)",
  "animate-pixel": "terminal-pixel 800ms linear infinite",

  "animate-select-fold-in-down":
    "terminal-select-fold-in-down 140ms steps(4, end)",
  "animate-select-fold-in-up": "terminal-select-fold-in-up 140ms steps(4, end)",
  "animate-select-fold-out-down":
    "terminal-select-fold-out-down 100ms steps(3, end) forwards",
  "animate-select-fold-out-up":
    "terminal-select-fold-out-up 100ms steps(3, end) forwards",
  "animate-slide-in-bottom":
    "terminal-slide-in-bottom 220ms var(--ease-terminal)",
  "animate-slide-in-left": "terminal-slide-in-left 220ms var(--ease-terminal)",
  "animate-slide-in-right":
    "terminal-slide-in-right 220ms var(--ease-terminal)",
  "animate-slide-in-top": "terminal-slide-in-top 220ms var(--ease-terminal)",
  "animate-slide-out-bottom":
    "terminal-slide-out-bottom 170ms var(--ease-terminal) forwards",
  "animate-slide-out-left":
    "terminal-slide-out-left 170ms var(--ease-terminal) forwards",
  "animate-slide-out-right":
    "terminal-slide-out-right 170ms var(--ease-terminal) forwards",
  "animate-slide-out-top":
    "terminal-slide-out-top 170ms var(--ease-terminal) forwards",
  "animate-sweep": "terminal-sweep 1.15s ease-in-out infinite",
  "animate-type": "terminal-type 560ms steps(24) both",

  "ease-terminal": "cubic-bezier(0.2, 0.7, 0.3, 1)",
  "radius-2xl": "0px",
  "radius-lg": "0px",
  "radius-md": "0px",

  "radius-sm": "0px",
  "radius-xl": "0px",

  "shadow-glow":
    "0 0 18px color-mix(in srgb, var(--phosphor) 18%, transparent)",
  "shadow-glow-destructive":
    "0 0 18px color-mix(in srgb, var(--destructive) 20%, transparent)",
  "shadow-glow-progress":
    "0 0 12px color-mix(in srgb, var(--phosphor) 50%, transparent)",
  "shadow-glow-signal":
    "0 0 34px 2px color-mix(in srgb, var(--signal) 55%, transparent)",
  "shadow-glow-slider":
    "0 0 10px color-mix(in srgb, var(--phosphor) 35%, transparent)",
  "shadow-glow-slider-hover":
    "0 0 14px color-mix(in srgb, var(--phosphor) 60%, transparent)",
  "shadow-glow-slider-track":
    "0 0 10px color-mix(in srgb, var(--phosphor) 45%, transparent)",
  "shadow-glow-strong":
    "0 0 34px 2px color-mix(in srgb, var(--phosphor) 40%, transparent), inset 0 0 0 1px color-mix(in srgb, var(--phosphor) 20%, transparent)",
  "shadow-kbd": "0 2px 0 rgb(0 0 0 / 0.45)",
  "shadow-panel":
    "0 2rem 5rem rgb(0 0 0 / 0.7), 0 0 50px color-mix(in srgb, var(--phosphor) 8%, transparent)",
  "shadow-panel-signal":
    "0 2rem 5rem rgb(0 0 0 / 0.7), 0 0 50px color-mix(in srgb, var(--signal) 10%, transparent)",
  "shadow-signal-control":
    "inset 0 0 0 1px rgb(255 255 255 / 0.12), 0 0 18px color-mix(in srgb, var(--signal) 12%, transparent)",
  "shadow-window": "0 2rem 8rem #000",

  "text-shadow-phosphor": "0 0 8px rgb(134 250 221 / 0.35)",
  "text-shadow-signal": "0 0 10px rgb(255 91 130 / 0.45)",
};

const REDUCED_MOTION_SELECTOR = Object.keys(THEME)
  .filter((key) => key.startsWith("animate-"))
  .map((key) => `.${key}`)
  .join(", ");

const CSS = {
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

  "@keyframes terminal-beam": {
    "30%": { opacity: "1" },
    from: { opacity: "0", transform: "translateY(-58%)" },
    to: { opacity: "0", transform: "translateY(58%)" },
  },

  "@keyframes terminal-caret": { "50%": { opacity: "0" } },
  "@keyframes terminal-close": {
    to: { opacity: "0", transform: "scale(0.98)" },
  },
  "@keyframes terminal-fade-in": { from: { opacity: "0" } },
  "@keyframes terminal-fade-out": { to: { opacity: "0" } },
  "@keyframes terminal-led": { "50%": { opacity: "0.45" } },
  "@keyframes terminal-line-in": {
    from: {
      "clip-path": "inset(-0.25em -0.12em 100% -0.06em)",
      opacity: "0",
      transform: "translateY(0.4em)",
    },
    to: {
      "clip-path": "inset(-0.25em -0.12em -0.25em -0.06em)",
      opacity: "1",
      transform: "none",
    },
  },
  "@keyframes terminal-open": {
    from: { opacity: "0", transform: "scale(0.97) translateY(0.7rem)" },
  },

  "@keyframes terminal-pixel": {
    "0%, 12.49%": { opacity: "1" },
    "12.5%, 24.99%": { opacity: "0.62" },
    "25%, 37.49%": { opacity: "0.34" },
    "37.5%, 100%": { opacity: "0.16" },
  },

  "@keyframes terminal-select-fold-in-down": {
    from: { "clip-path": "inset(0 0 100% 0)" },
  },
  "@keyframes terminal-select-fold-in-up": {
    from: { "clip-path": "inset(100% 0 0 0)" },
  },
  "@keyframes terminal-select-fold-out-down": {
    to: { "clip-path": "inset(100% 0 0 0)" },
  },
  "@keyframes terminal-select-fold-out-up": {
    to: { "clip-path": "inset(0 0 100% 0)" },
  },
  "@keyframes terminal-slide-in-bottom": {
    from: { transform: "translateY(100%)" },
  },
  "@keyframes terminal-slide-in-left": {
    from: { transform: "translateX(-100%)" },
  },
  "@keyframes terminal-slide-in-right": {
    from: { transform: "translateX(100%)" },
  },
  "@keyframes terminal-slide-in-top": {
    from: { transform: "translateY(-100%)" },
  },
  "@keyframes terminal-slide-out-bottom": {
    to: { transform: "translateY(100%)" },
  },
  "@keyframes terminal-slide-out-left": {
    to: { transform: "translateX(-100%)" },
  },
  "@keyframes terminal-slide-out-right": {
    to: { transform: "translateX(100%)" },
  },
  "@keyframes terminal-slide-out-top": {
    to: { transform: "translateY(-100%)" },
  },
  "@keyframes terminal-sweep": {
    from: { transform: "translateX(-110%)" },

    to: { transform: "translateX(300%)" },
  },

  "@keyframes terminal-type": {
    from: { "clip-path": "inset(-0.4em 100% -0.4em -0.1em)" },
    to: { "clip-path": "inset(-0.4em -0.15em -0.4em -0.1em)" },
  },
  "@layer base": {
    "::selection": {
      background: "var(--signal)",
      color: "#fff",
    },
    ":root": {
      "color-scheme": "dark",

      "scrollbar-color": "var(--phosphor-dim) transparent",
      "scrollbar-width": "thin",
    },

    ":where(a, button, input, textarea, select, summary, [tabindex]):focus-visible":
      {
        outline: "2px solid var(--phosphor-bright)",
        "outline-offset": "3px",
      },
    "*": {
      "border-color": "var(--border)",
    },
    body: {
      "-webkit-font-smoothing": "antialiased",
      background: "var(--background)",
      color: "var(--foreground)",
      "font-family": "var(--font-sans)",
      "text-rendering": "optimizeLegibility",
    },

    html: {
      "overflow-y": "scroll",
      "scrollbar-gutter": "stable",
    },
  },

  "@media (prefers-reduced-motion: reduce)": {
    [REDUCED_MOTION_SELECTOR]: {
      animation: "none !important",
    },
  },

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
  "@utility terminal-caret": {
    "background-color": "currentColor",
    display: "inline-block",
    "flex-shrink": "0",
    height: "1em",
    "vertical-align": "-0.125em",
    width: "0.5em",
  },
  "@utility vignette": {
    "background-image":
      "radial-gradient(130% 100% at 50% 50%, transparent 52%, rgb(0 0 0 / 0.55) 100%)",
  },
};

export const palette = PALETTE;

export const cssVars = {
  dark: { ...RAW, ...SEMANTIC },
  light: { ...RAW, ...SEMANTIC },
  theme: THEME,
};

export const css = CSS;
