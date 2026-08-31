"use client";

import type * as React from "react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/registry/terminal/hooks/use-reduced-motion";

const WIDTH = 220;
const HEIGHT = 124;

const STATIC_NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' type='fractalNoise'/%3E%3C/filter%3E%3Crect filter='url(%23g)' height='100%25' width='100%25'/%3E%3C/svg%3E\")";

function Grain({
  animated = false,
  className,
  fps = 24,
  opacity = 0.13,
  ...props
}: React.ComponentProps<"div"> & {
  animated?: boolean;
  fps?: number;
  opacity?: number;
}) {
  const reduced = useReducedMotion();
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const running = animated && !reduced;

  useEffect(() => {
    if (!(running && canvas)) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const image = context.createImageData(WIDTH, HEIGHT);
    const { data } = image;
    const step = 1000 / fps;
    let frame = 0;
    let last = 0;
    let visible = true;

    const paint = (now: number) => {
      frame = requestAnimationFrame(paint);
      if (!visible || now - last < step) {
        return;
      }
      last = now;
      for (let index = 0; index < WIDTH * HEIGHT; index += 1) {
        const value = Math.trunc(Math.random() * 255);
        data[index * 4] = value;
        data[index * 4 + 1] = value;
        data[index * 4 + 2] = value;
        data[index * 4 + 3] = 255;
      }
      context.putImageData(image, 0, 0);
    };

    const observer = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    observer.observe(canvas);
    frame = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [canvas, fps, running]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-screen",
        className
      )}
      data-slot="grain"
      style={{
        backgroundImage: running ? undefined : STATIC_NOISE,
        opacity,
      }}
      {...props}
    >
      {running ? (
        <canvas
          className="block size-full [image-rendering:pixelated]"
          height={HEIGHT}
          ref={setCanvas}
          width={WIDTH}
        />
      ) : null}
    </div>
  );
}

export { Grain };
