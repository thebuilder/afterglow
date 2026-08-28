"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

/**
 * The one piece of chrome in the set that is not on the tube.
 *
 * A grey window with a pinstriped titlebar, and the contrast is the point:
 * everything else in the set is a readout painted on glass, and this is an
 * object sitting in front of it. Use it where something is genuinely a separate
 * document rather than another panel.
 *
 * Two chromes, because the two conventions disagree about where a window's
 * controls live and splitting the difference gets you neither. `macos` puts
 * three lights at the left and centres the title; `windows` puts the title at
 * the left and a row of flat controls hard against the right, where the close
 * button turns red under the cursor.
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

const LIGHTS: { name: LightName; label: string; color: string }[] = [
  { color: "#ff5d7f", label: "Close", name: "close" },
  { color: "#ffd45d", label: "Collapse", name: "collapse" },
  { color: "#68d9b4", label: "Zoom", name: "zoom" },
];

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
  variant?: "macos" | "windows";
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

  /**
   * The size is taken from the frame's own measured box when the drag starts,
   * so the window can be laid out with classes until somebody grabs it and only
   * then becomes pixel-sized.
   *
   * The axis comes off the handle that fired rather than a bound argument, so
   * the three zones share one memoized callback.
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

  const collapse = collapsible
    ? () => setCollapsed((shaded) => !shaded)
    : undefined;
  const action: Record<LightName, (() => void) | undefined> = {
    close: onClose,
    collapse,
    zoom: onZoom,
  };

  const controls = LIGHTS.map((light) =>
    variant === "macos" ? (
      <Light
        action={action[light.name]}
        className="relative block size-[0.72rem] border border-[#2b443e] p-0 text-transparent transition-colors group-hover/titlebar:text-[rgb(9_22_19/0.72)]"
        key={light.name}
        light={light}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: light.color }}
        />
        <span className="absolute inset-0">
          <Marks name={light.name} />
        </span>
      </Light>
    ) : (
      <Light
        action={action[light.name]}
        className={cn(
          "relative grid w-11 place-items-center self-stretch border-0 bg-transparent text-[#1b302b] transition-colors",
          light.name === "close"
            ? "hover:bg-[#e81123] hover:text-white"
            : "hover:bg-[rgb(9_22_19/0.12)]"
        )}
        key={light.name}
        light={light}
      >
        <span className="relative block size-[0.6rem]">
          <Marks name={light.name} />
        </span>
      </Light>
    )
  );

  return (
    <div
      className={cn(
        "relative grid border-[3px] border-[#263d38] border-double bg-[#b6c4be] text-[#09100f] shadow-[0_2rem_8rem_#000]",
        collapsed
          ? "!h-fit grid-rows-[auto]"
          : "grid-rows-[auto_minmax(0,1fr)_auto]",
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
          "group/titlebar flex select-none items-center gap-2 border-[#1b302b] bg-[repeating-linear-gradient(#c3cfca_0_1px,#a2b4ac_1px_3px)] p-1.5",
          collapsed ? "border-b-0" : "border-b-2",
          /* The subtitle is a second line, and a second line is most of the
             chrome's height. Without one the bar is sized to the title alone. */
          subtitle ? "min-h-[3.25rem]" : "min-h-9",
          variant === "macos" && "justify-between"
        )}
        data-slot="terminal-window-titlebar"
      >
        {variant === "macos" && (
          <div className="flex justify-self-start gap-px bg-[#b6c4be] p-1">
            {controls}
          </div>
        )}
        <div
          className={cn(
            "grid min-w-0 gap-0.5 bg-[#b6c4be] px-2 py-0.5",
            variant === "macos"
              ? "shrink justify-items-center text-center"
              : "mr-auto justify-items-start"
          )}
        >
          {subtitle ? (
            <span className="font-bold font-mono text-[#38544d] text-[0.48rem] uppercase tracking-[0.12em]">
              {subtitle}
            </span>
          ) : null}
          <h2 className="max-w-full truncate font-bold font-mono text-[0.82rem] leading-tight">
            {title}
          </h2>
        </div>
        {/* Balances the control cluster so the macOS title lands on the centre
            of the bar rather than the centre of what is left of it. */}
        {variant === "macos" && (
          <div aria-hidden="true" className="w-[3.1rem] shrink-0" />
        )}
        {variant === "windows" && (
          <div className="-my-1.5 -mr-1.5 flex self-stretch justify-self-end">
            {controls}
          </div>
        )}
      </div>

      {!collapsed && (
        <>
          {/**
           * The content is a well, not a flush panel: a margin of chrome all
           * round it and an inset edge, the way a beige-era window recessed its
           * document. That margin is also what makes the resize grip usable,
           * because the grip lives in it and never sits over the scrollbar or
           * over something you were trying to click.
           */}
          <div
            className="m-2 min-h-0 overflow-auto overscroll-contain border-2 border-[#d8e2de] bg-panel-sunken text-phosphor-bright [border-style:inset]"
            data-slot="terminal-window-content"
          >
            {children}
          </div>

          {footer ? (
            <div
              className="flex min-h-7 items-center justify-between gap-4 border-[#536c65] border-t px-2.5 pr-6 font-bold font-mono text-[#263e38] text-[0.48rem] uppercase tracking-[0.08em]"
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
            className="-right-[3px] absolute inset-y-0 w-2 cursor-ew-resize touch-none"
            data-axis="x"
            onPointerDown={startResize}
          />
          <span
            aria-hidden="true"
            className="-bottom-[3px] absolute inset-x-0 h-2 cursor-ns-resize touch-none"
            data-axis="y"
            onPointerDown={startResize}
          />
          <button
            aria-label="Resize window"
            className="-right-[3px] -bottom-[3px] absolute z-1 size-3.5 cursor-nwse-resize touch-none border-0 bg-transparent p-0 outline-none focus-visible:outline-2 focus-visible:outline-phosphor-bright"
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
              className="block size-full bg-[repeating-linear-gradient(-45deg,transparent_0_2px,#3d554f_2px_3px)]"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
            />
          </button>
        </>
      )}
    </div>
  );
}

export { TerminalWindow };
