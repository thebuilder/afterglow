"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

const MIN_WIDTH = 260;
const MIN_HEIGHT = 160;
const KEY_STEP = 24;

const MARKS = {
  close: [
    "absolute inset-x-[8%] inset-y-[calc(50%-0.5px)] rotate-45 bg-current",
    "-rotate-45 absolute inset-x-[8%] inset-y-[calc(50%-0.5px)] bg-current",
  ],
  collapse: ["absolute inset-x-[12%] inset-y-[calc(50%-0.5px)] bg-current"],
  zoom: [
    "absolute inset-x-[12%] inset-y-[calc(50%-0.5px)] bg-current",
    "absolute inset-x-[calc(50%-0.5px)] inset-y-[12%] bg-current",
  ],
} as const;

type LightName = keyof typeof MARKS;
type Variant = "macos" | "windows" | "terminal";

const LIGHTS: { name: LightName; label: string; color: string }[] = [
  { color: "var(--window-close)", label: "Close", name: "close" },
  { color: "var(--window-collapse)", label: "Collapse", name: "collapse" },
  { color: "var(--window-zoom)", label: "Zoom", name: "zoom" },
];

const CHROME: Record<
  Variant,
  {
    frame: string;
    bar: string;
    barTall: string;
    plate: string;
    subtitle: string;
    title: string;
    content: string;
    footer: string;

    edgeX: string;
    edgeY: string;
    corner: string;
    grip: string;
    control: string;
    markBox: string;
  }
> = {
  macos: {
    bar: "border-window-rule bg-window-titlebar p-1.5 min-h-9 justify-between",
    barTall: "min-h-[3.25rem]",
    content: "m-2 border-2 border-window-inset [border-style:inset]",
    control:
      "relative block size-[0.72rem] border border-window-control p-0 text-transparent transition-colors group-hover/titlebar:text-window-text/72",
    corner: "-right-[3px] -bottom-[3px] size-3.5",
    edgeX: "-right-[3px] w-2",
    edgeY: "-bottom-[3px] h-2",
    footer:
      "min-h-7 px-2.5 pr-6 text-[0.48rem] border-window-footer text-window-footer-text",
    frame:
      "border-[3px] border-window-border border-double bg-window-surface text-window-text shadow-window",
    grip: "bg-window-grip",
    markBox: "absolute inset-0",
    plate:
      "bg-window-surface px-2 py-0.5 shrink justify-items-center text-center",
    subtitle: "text-window-text-muted",
    title: "font-bold text-[0.82rem]",
  },
  terminal: {
    bar: "border-line bg-secondary px-2 py-1 min-h-7",
    barTall: "min-h-11",
    content: "",
    control:
      "relative grid size-[0.9rem] place-items-center border border-line bg-panel p-0 text-phosphor-dim transition-colors hover:border-line-strong hover:text-phosphor-bright",
    corner: "-right-px -bottom-px size-3",
    edgeX: "-right-px w-1.5",
    edgeY: "-bottom-px h-1.5",

    footer: "min-h-5 px-2 pr-5 text-[0.4375rem] border-line text-phosphor-dim",
    frame: "border border-line bg-panel text-foreground shadow-panel",
    grip: "bg-[repeating-linear-gradient(-45deg,transparent_0_2px,var(--phosphor-dim)_2px_3px)]",
    markBox: "relative block size-[0.5rem]",
    plate: "mr-auto justify-items-start",
    subtitle: "text-phosphor-dim",
    title:
      "font-semibold text-1xs text-phosphor-bright uppercase tracking-terminal-lg",
  },
  windows: {
    bar: "border-window-rule bg-window-titlebar p-1.5 min-h-9",
    barTall: "min-h-[3.25rem]",
    content: "m-2 border-2 border-window-inset [border-style:inset]",
    control:
      "relative grid size-[1.15rem] place-items-center border border-t-window-bevel-light border-r-window-bevel-dark border-b-window-bevel-dark border-l-window-bevel-light bg-window-surface p-0 text-window-rule active:border-t-window-bevel-dark active:border-r-window-bevel-light active:border-b-window-bevel-light active:border-l-window-bevel-dark",

    corner: "-right-[3px] -bottom-[3px] size-3.5",
    edgeX: "-right-[3px] w-2",
    edgeY: "-bottom-[3px] h-2",
    footer:
      "min-h-7 px-2.5 pr-6 text-[0.48rem] border-window-footer text-window-footer-text",
    frame:
      "border-[3px] border-window-border border-double bg-window-surface text-window-text shadow-window",
    grip: "bg-window-grip",
    markBox: "relative block size-[0.55rem]",
    plate: "bg-window-surface px-2 py-0.5 mr-auto justify-items-start",
    subtitle: "text-window-text-muted",
    title: "font-bold text-[0.82rem]",
  },
};

function Marks({ name }: { name: LightName }) {
  return (
    <>
      {MARKS[name].map((mark) => (
        <span className={mark} key={mark} />
      ))}
    </>
  );
}

function Light({
  light,
  action,
  className,
  children,
}: {
  light: (typeof LIGHTS)[number];
  action?: () => void;
  className: string;
  children: React.ReactNode;
}) {
  if (!action) {
    return (
      <span aria-hidden="true" className={className} title={light.label}>
        {children}
      </span>
    );
  }

  return (
    <button
      aria-label={light.label}
      className={cn(className, "cursor-pointer")}
      onClick={action}
      title={light.label}
      type="button"
    >
      {children}
    </button>
  );
}

function Controls({
  variant,
  action,
}: {
  variant: Variant;
  action: Record<LightName, (() => void) | undefined>;
}) {
  const chrome = CHROME[variant];

  return (
    <>
      {LIGHTS.map((light) => (
        <Light
          action={action[light.name]}
          className={chrome.control}
          key={light.name}
          light={light}
        >
          {variant === "macos" && (
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: light.color }}
            />
          )}
          <span className={chrome.markBox}>
            <Marks name={light.name} />
          </span>
        </Light>
      ))}
    </>
  );
}

function TerminalWindow({
  className,
  children,
  title,
  subtitle,
  footer,
  variant = "macos",
  resizable = false,
  collapsible = false,
  onClose,
  onZoom,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  variant?: Variant;
  resizable?: boolean;
  collapsible?: boolean;
  onClose?: () => void;
  onZoom?: () => void;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null
  );
  const [collapsed, setCollapsed] = useState(false);
  const chrome = CHROME[variant];

  const startResize = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    const axis = event.currentTarget.dataset.axis as "x" | "y" | "both";
    const box = frame.current?.getBoundingClientRect();
    if (!box) {
      return;
    }

    event.preventDefault();
    const handle = event.currentTarget;
    const originX = event.clientX;
    const originY = event.clientY;

    try {
      handle.setPointerCapture(event.pointerId);
    } catch {
      // Not every pointer allows capture; the listeners below still work.
    }

    const move = (moved: PointerEvent) => {
      setSize({
        height:
          axis === "x"
            ? box.height
            : Math.max(MIN_HEIGHT, box.height + moved.clientY - originY),
        width:
          axis === "y"
            ? box.width
            : Math.max(MIN_WIDTH, box.width + moved.clientX - originX),
      });
    };

    const stop = () => {
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", stop);
      handle.removeEventListener("pointercancel", stop);
    };

    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", stop);
    handle.addEventListener("pointercancel", stop);
  }, []);

  const nudge = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    const step = {
      ArrowDown: [0, KEY_STEP],
      ArrowLeft: [-KEY_STEP, 0],
      ArrowRight: [KEY_STEP, 0],
      ArrowUp: [0, -KEY_STEP],
    }[event.key];
    const box = frame.current?.getBoundingClientRect();

    if (!(step && box)) {
      return;
    }

    event.preventDefault();
    setSize({
      height: Math.max(MIN_HEIGHT, box.height + step[1]),
      width: Math.max(MIN_WIDTH, box.width + step[0]),
    });
  }, []);

  const toggleCollapsed = useCallback(() => setCollapsed((open) => !open), []);
  const action: Record<LightName, (() => void) | undefined> = {
    close: onClose,
    collapse: collapsible ? toggleCollapsed : undefined,
    zoom: onZoom,
  };

  return (
    <div
      className={cn(
        "relative grid",
        chrome.frame,
        collapsed
          ? "!h-fit grid-rows-[auto]"
          : "grid-rows-[auto_minmax(0,1fr)_auto]",

        variant === "terminal" && resizable && !(collapsed || footer) && "pb-3",
        className
      )}
      data-collapsed={collapsed || undefined}
      data-slot="terminal-window"
      data-variant={variant}
      ref={frame}
      style={size && !collapsed ? { ...style, ...size } : style}
      {...props}
    >
      <div
        className={cn(
          "group/titlebar flex select-none items-center gap-2",
          chrome.bar,

          subtitle && chrome.barTall,
          collapsed ? "border-b-0" : "border-b-2",
          variant === "terminal" && !collapsed && "border-b"
        )}
        data-slot="terminal-window-titlebar"
      >
        {variant === "macos" && (
          <div className="flex justify-self-start gap-px bg-window-surface p-1">
            <Controls action={action} variant={variant} />
          </div>
        )}

        <div className={cn("grid min-w-0 gap-0.5", chrome.plate)}>
          {subtitle ? (
            <span
              className={cn(
                "font-bold font-mono text-[0.48rem] uppercase tracking-terminal-lg",
                chrome.subtitle
              )}
            >
              {subtitle}
            </span>
          ) : null}
          <h2
            className={cn(
              "max-w-full truncate font-mono leading-tight",
              chrome.title
            )}
          >
            {title}
          </h2>
        </div>

        {/* Mirrors the controls to keep the macOS title centered. */}
        {variant === "macos" && (
          <div aria-hidden="true" className="w-[3.1rem] shrink-0" />
        )}
        {variant === "windows" && (
          <div className="-my-1.5 -mr-1.5 flex items-center gap-0.5 self-stretch px-1.5">
            <Controls action={action} variant={variant} />
          </div>
        )}
        {variant === "terminal" && (
          <div className="flex items-center gap-1">
            <Controls action={action} variant={variant} />
          </div>
        )}
      </div>

      {!collapsed && (
        <>
          <div
            className={cn(
              "min-h-0 overflow-auto overscroll-contain bg-panel-sunken text-phosphor-bright",
              chrome.content
            )}
            data-slot="terminal-window-content"
          >
            {children}
          </div>

          {footer ? (
            <div
              className={cn(
                "flex items-center justify-between gap-4 border-t font-bold font-mono uppercase tracking-terminal-sm",
                chrome.footer
              )}
              data-slot="terminal-window-footer"
            >
              {footer}
            </div>
          ) : null}
        </>
      )}

      {resizable && !collapsed && (
        <>
          {/* Only the corner is keyboard-focusable. */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-y-0 cursor-ew-resize touch-none",
              chrome.edgeX
            )}
            data-axis="x"
            onPointerDown={startResize}
          />
          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 cursor-ns-resize touch-none",
              chrome.edgeY
            )}
            data-axis="y"
            onPointerDown={startResize}
          />
          <button
            aria-label="Resize window"
            className={cn(
              "absolute z-1 cursor-nwse-resize touch-none border-0 bg-transparent p-0 outline-none focus-visible:outline-2 focus-visible:outline-phosphor-bright",
              chrome.corner
            )}
            data-axis="both"
            onKeyDown={nudge}
            onPointerDown={startResize}
            type="button"
          >
            <span
              aria-hidden="true"
              className={cn("block size-full", chrome.grip)}
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />
          </button>
        </>
      )}
    </div>
  );
}

export { TerminalWindow };
