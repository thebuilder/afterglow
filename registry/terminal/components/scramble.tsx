"use client";

import type * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/registry/terminal/hooks/use-reduced-motion";

const GLYPHS = "!<>-_\\/[]{}=+*^?#|";

function scrambled(text: string, resolved: number, charset: string): string {
  let out = "";

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    out +=
      index < resolved || character === " "
        ? character
        : charset[Math.floor(Math.random() * charset.length)];
  }

  return out;
}

function Scramble({
  charset = GLYPHS,
  className,
  rate = 0.55,
  speed = 34,
  text,
  trigger = "mount",
  ...props
}: Omit<React.ComponentProps<"span">, "children"> & {
  charset?: string;
  rate?: number;
  speed?: number;
  text: string;
  trigger?: "mount" | "hover" | "view";
}) {
  const reduced = useReducedMotion();
  const [element, setElement] = useState<HTMLSpanElement | null>(null);
  const [runs, setRuns] = useState(trigger === "mount" ? 1 : 0);
  const [shown, setShown] = useState(text);

  const start = useCallback(() => setRuns((count) => count + 1), []);

  useEffect(() => {
    setShown(text);
    setRuns(trigger === "mount" ? 1 : 0);
  }, [text, trigger]);

  useEffect(() => {
    if (runs === 0 || reduced) {
      setShown(text);
      return;
    }

    let resolved = 0;
    const timer = window.setInterval(() => {
      resolved += rate;
      if (resolved >= text.length) {
        window.clearInterval(timer);
        setShown(text);
        return;
      }
      setShown(scrambled(text, resolved, charset));
    }, speed);

    return () => window.clearInterval(timer);
  }, [charset, rate, reduced, runs, speed, text]);

  useEffect(() => {
    if (trigger !== "view" || !element) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        start();
        observer.disconnect();
      }
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [element, start, trigger]);

  return (
    <span
      className={cn("font-mono", className)}
      data-slot="scramble"
      onPointerEnter={trigger === "hover" ? start : undefined}
      ref={setElement}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="select-none">
        {shown}
      </span>
    </span>
  );
}

export { Scramble };
