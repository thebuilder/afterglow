"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

// One pass of the beam, from above the field to the bottom edge, in ms.
const SWEEP = 7200;
// Grid pitch in CSS pixels. Must match the static raster painted underneath by
// GRID, so the beam lights the dots that are already there.
const CELL = 15;
// How far behind the beam a row still catches light.
const REACH = 84;
// Per-frame erase. Lower leaves a longer afterglow.
const DECAY = 0.05;
const DOT = 2;
const MAX_DPR = 2;
const PHOSPHOR_FALLBACK = [134, 250, 221] as const;
const HEX = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i;

const GRID =
  "[background-image:radial-gradient(circle_at_1px_1px,var(--phosphor-dim)_1px,transparent_0)] [background-size:15px_15px]";

// Deterministic per-cell brightness, so a lit row reads as data rather than as
// a solid bar. The pass number varies the pattern on every sweep.
function weight(col: number, row: number, pass: number) {
  const n = Math.sin(col * 127.1 + row * 311.7 + pass * 74.7) * 43_758.545;
  return n - Math.floor(n);
}

function readPhosphor(element: HTMLElement) {
  const value = getComputedStyle(element).getPropertyValue("--phosphor").trim();
  const hex = HEX.exec(value);
  if (!hex) {
    return PHOSPHOR_FALLBACK;
  }
  return [
    Number.parseInt(hex[1], 16),
    Number.parseInt(hex[2], 16),
    Number.parseInt(hex[3], 16),
  ] as const;
}

export function PhosphorField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = ref.current?.getContext("2d");
    if (!context) {
      return;
    }
    const { canvas } = context;

    let width = 0;
    let height = 0;
    let rgb = readPhosphor(canvas);
    let frame = 0;

    const paintRow = (row: number, alpha: (col: number) => number) => {
      const y = row * CELL;
      for (let col = 0; col * CELL < width; col += 1) {
        const value = alpha(col);
        if (value < 0.02) {
          continue;
        }
        context.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${value})`;
        context.fillRect(col * CELL, y, DOT, DOT);
      }
    };

    // Phase comes straight off the clock rather than off an elapsed counter, so
    // a single frame after a throttled tab wakes up still lands in the right
    // place instead of snapping back to the top.
    const render = (now: number) => {
      // Erase alpha rather than painting the background over it, so the canvas
      // stays transparent and the decay reads as the tube letting go.
      context.globalCompositeOperation = "destination-out";
      context.fillStyle = `rgba(0,0,0,${DECAY})`;
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";

      const pass = Math.floor(now / SWEEP);
      const beam = ((now % SWEEP) / SWEEP) * (height + REACH) - REACH;
      const first = Math.max(0, Math.ceil((beam - REACH) / CELL));
      const last = Math.min(Math.floor(height / CELL), Math.floor(beam / CELL));

      for (let row = first; row <= last; row += 1) {
        const falloff = 1 - (beam - row * CELL) / REACH;
        const fade = falloff * falloff;
        paintRow(row, (col) => fade * (0.12 + weight(col, row, pass) * 0.7));
      }

      if (beam >= 0 && beam <= height) {
        context.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.045)`;
        context.fillRect(0, beam - 14, width, 15);
        context.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.2)`;
        context.fillRect(0, beam, width, 1);
      }
    };

    const still = () => {
      context.globalCompositeOperation = "source-over";
      context.clearRect(0, 0, width, height);
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      render(now);
    };

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };
    const start = () => {
      if (motion.matches) {
        stop();
        still();
        return;
      }
      if (!frame) {
        // Seed one frame now, so the raster is lit before the first callback.
        render(performance.now());
        frame = requestAnimationFrame(loop);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      ({ height, width } = canvas.getBoundingClientRect());
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // The hero is all this paints, so give the CPU back once it scrolls away.
    const onscreen = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop()
    );
    onscreen.observe(canvas);

    const phosphor = new MutationObserver(() => {
      rgb = readPhosphor(canvas);
    });
    phosphor.observe(document.documentElement, {
      attributeFilter: ["data-phosphor"],
    });

    resize();
    motion.addEventListener("change", start);
    start();

    return () => {
      stop();
      observer.disconnect();
      onscreen.disconnect();
      phosphor.disconnect();
      motion.removeEventListener("change", start);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", GRID, className)}
      data-slot="phosphor-field"
    >
      <canvas className="block size-full" ref={ref} />
    </div>
  );
}
