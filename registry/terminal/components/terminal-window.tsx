"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

/**
 * The window.
 *
 * Three chromes. `macos` puts three lights at the left and centres the title;
 * `windows` puts the title at the left and a row of bevelled buttons hard
 * against the right. Both are the beige era, drawn heavy on purpose: everything
 * else in this system is painted flat on the glass, and these are objects
 * sitting in front of it.
 *
 * `terminal` is the same window in this system's own vocabulary. One hairline
 * instead of a double border, a slim bar instead of a pinstriped one, the
 * content flush rather than recessed, and the controls as small bracketed
 * marks. Reach for it when the window has to sit among the panels rather than
 * in front of them.
 *
 * What it deliberately does not do is move. A window you can drag belongs in a
 * layer of its own, and this one sits in the page's flow: dragging it would
 * either tear it out of the document or shove everything around it.
 */

const MIN_WIDTH = 260;
const MIN_HEIGHT = 160;
const KEY_STEP = 24;

/**
 * Each mark is built from one-pixel rules given explicit insets, not from a
 * text glyph and not from a rotated box with no insets at all. `×` and `+` set
 * at eleven pixels are strokes the eye cannot complete, and an absolutely
 * positioned span with every inset left `auto` falls back to its static
 * position, which in a grid is the corner rather than the middle.
 */
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
  { color: "#ff5d7f", label: "Close", name: "close" },
  { color: "#ffd45d", label: "Collapse", name: "collapse" },
  { color: "#68d9b4", label: "Zoom", name: "zoom" },
];

/**
 * Every difference between the three chromes, in one table.
 *
 * Written as conditionals inline this was thirty-odd branches threaded through
 * one component, and adding a fourth chrome meant finding all of them. Here a
 * chrome is a row you can read across.
 */
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
    /* An absolute inset is measured from the padding box, so pulling a zone
       flush with the outer edge means pulling it out by the border's width. */
    edgeX: string;
    edgeY: string;
    corner: string;
    grip: string;
    control: string;
    markBox: string;
  }
> = {
  macos: {
    bar: "border-[#1b302b] bg-[repeating-linear-gradient(#c3cfca_0_1px,#a2b4ac_1px_3px)] p-1.5 min-h-9 justify-between",
    barTall: "min-h-[3.25rem]",
    content: "m-2 border-2 border-[#d8e2de] [border-style:inset]",
    control:
      "relative block size-[0.72rem] border border-[#2b443e] p-0 text-transparent transition-colors group-hover/titlebar:text-[rgb(9_22_19/0.72)]",
    corner: "-right-[3px] -bottom-[3px] size-3.5",
    edgeX: "-right-[3px] w-2",
    edgeY: "-bottom-[3px] h-2",
    footer:
      "min-h-7 px-2.5 pr-6 text-[0.48rem] border-[#536c65] text-[#263e38]",
    frame:
      "border-[3px] border-[#263d38] border-double bg-[#b6c4be] text-[#09100f] shadow-[0_2rem_8rem_#000]",
    grip: "bg-[repeating-linear-gradient(-45deg,transparent_0_2px,#3d554f_2px_3px)]",
    markBox: "absolute inset-0",
    plate: "bg-[#b6c4be] px-2 py-0.5 shrink justify-items-center text-center",
    subtitle: "text-[#38544d]",
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
    /* Slimmer than the beige chromes': a status rail here is one line of
       hairline type, not a moulded strip with a lip above and below it. */
    footer: "min-h-5 px-2 pr-5 text-[0.4375rem] border-line text-phosphor-dim",
    frame: "border border-line bg-panel text-foreground shadow-panel",
    grip: "bg-[repeating-linear-gradient(-45deg,transparent_0_2px,var(--phosphor-dim)_2px_3px)]",
    markBox: "relative block size-[0.5rem]",
    plate: "mr-auto justify-items-start",
    subtitle: "text-phosphor-dim",
    title:
      "font-semibold text-[0.6875rem] text-phosphor-bright uppercase tracking-[0.12em]",
  },
  windows: {
    bar: "border-[#1b302b] bg-[repeating-linear-gradient(#c3cfca_0_1px,#a2b4ac_1px_3px)] p-1.5 min-h-9",
    barTall: "min-h-[3.25rem]",
    content: "m-2 border-2 border-[#d8e2de] [border-style:inset]",
    control:
      "relative grid size-[1.15rem] place-items-center border border-t-[#e7eeeb] border-r-[#5c7269] border-b-[#5c7269] border-l-[#e7eeeb] bg-[#b6c4be] p-0 text-[#1b302b] active:border-t-[#5c7269] active:border-r-[#e7eeeb] active:border-b-[#e7eeeb] active:border-l-[#5c7269]",
    /* An outset bevel: light on the top and left, shadow on the bottom and
       right, inverting on press. That inversion is the era's entire feedback
       vocabulary, and without it the buttons are just marks on a stripe. */
    corner: "-right-[3px] -bottom-[3px] size-3.5",
    edgeX: "-right-[3px] w-2",
    edgeY: "-bottom-[3px] h-2",
    footer:
      "min-h-7 px-2.5 pr-6 text-[0.48rem] border-[#536c65] text-[#263e38]",
    frame:
      "border-[3px] border-[#263d38] border-double bg-[#b6c4be] text-[#09100f] shadow-[0_2rem_8rem_#000]",
    grip: "bg-[repeating-linear-gradient(-45deg,transparent_0_2px,#3d554f_2px_3px)]",
    markBox: "relative block size-[0.55rem]",
    plate: "bg-[#b6c4be] px-2 py-0.5 mr-auto justify-items-start",
    subtitle: "text-[#38544d]",
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

/**
 * A light is a button when something is listening and a painted dot when
 * nothing is. A control that looks pressable and does nothing is worse than one
 * that never claimed to be a control.
 */
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

  /**
   * The size is taken from the frame's own measured box when the drag starts,
   * so the window can be laid out with classes until somebody grabs it and only
   * then becomes pixel-sized. The axis comes off the handle that fired rather
   * than a bound argument, so the three zones share one memoized callback.
   *
   * Nothing calls `releasePointerCapture`. The capture is released implicitly
   * on `pointerup`, and calling it again afterwards throws `NotFoundError`,
   * which aborts the rest of the teardown and leaves the move listener
   * attached: the window then goes on resizing with no button held.
   */
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

  /** A drag handle nobody can reach with a keyboard is a control for some people only. */
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
        /* Flush content leaves the grip nowhere to sit, so the terminal chrome
           keeps a rail at the bottom for it, unless a footer is already serving
           as one. The heavy chromes get theirs free, out of the margin around
           their well. */
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
          /* The subtitle is a second line, and a second line is most of the
             chrome's height. Without one the bar is sized to the title alone. */
          subtitle && chrome.barTall,
          collapsed ? "border-b-0" : "border-b-2",
          variant === "terminal" && !collapsed && "border-b"
        )}
        data-slot="terminal-window-titlebar"
      >
        {variant === "macos" && (
          <div className="flex justify-self-start gap-px bg-[#b6c4be] p-1">
            <Controls action={action} variant={variant} />
          </div>
        )}

        <div className={cn("grid min-w-0 gap-0.5", chrome.plate)}>
          {subtitle ? (
            <span
              className={cn(
                "font-bold font-mono text-[0.48rem] uppercase tracking-[0.12em]",
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

        {/* Balances the control cluster so the macOS title lands on the centre
            of the bar rather than the centre of what is left of it. */}
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
          {/**
           * In the heavy chromes the content is a well: a margin of chrome all
           * round it and an inset edge, the way a beige-era window recessed its
           * document. That margin is also what makes the resize grip usable,
           * because the grip lives in it and never sits over the scrollbar.
           *
           * The terminal chrome has no well. Everything else in this system is
           * painted flat on the glass, and a recessed document in the middle of
           * it would be the one raised object on the page.
           */}
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
                "flex items-center justify-between gap-4 border-t font-bold font-mono uppercase tracking-[0.08em]",
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
          {/* The zones straddle the frame rather than sitting inside it, so the
              cursor changes where the edge looks like it is. The corner carries
              the keyboard, so resizing has one focus stop rather than three. */}
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
            {/* Rules in the corner triangle, which is what a grow box has always
                looked like. A filled square of hatching reads as a patch of
                texture rather than as somewhere to take hold. */}
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
