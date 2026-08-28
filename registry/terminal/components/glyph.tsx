import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A file marker: a box in the category's colour with the corner turned up.
 *
 * The colour is a single custom property and everything else is derived from it
 * with `color-mix`, so a new category is one hex value rather than a border
 * colour, a fill, an inset shade and a glow that have to be kept in agreement.
 *
 * Those derived values are written as inline styles rather than classes on
 * purpose: they are computed from a variable the caller sets, and a utility
 * class cannot be.
 */
const TONES = {
  archive: "#e6de6d",
  audio: "var(--violet)",
  code: "var(--phosphor)",
  directory: "var(--signal)",
  document: "var(--azure)",
  image: "var(--amber)",
  system: "var(--ember)",
  unknown: "var(--ink-muted)",
} as const;

function Glyph({
  className,
  tone = "unknown",
  color,
  ...props
}: React.ComponentProps<"span"> & {
  tone?: keyof typeof TONES;
  color?: string;
}) {
  const glyph = color ?? TONES[tone];

  return (
    <span
      className={cn("relative block size-10 shrink-0", className)}
      data-slot="glyph"
      data-tone={tone}
      style={{
        background: `color-mix(in srgb, ${glyph} 18%, transparent)`,
        border: `1px solid color-mix(in srgb, ${glyph} 72%, transparent)`,
        boxShadow: `inset -0.35rem -0.35rem 0 color-mix(in srgb, ${glyph} 9%, transparent), 0 0 14px color-mix(in srgb, ${glyph} 13%, transparent)`,
      }}
      {...props}
    >
      <span
        className="absolute right-[-1px] bottom-[-1px] h-2/5 w-2/5"
        style={{
          borderLeft: `1px solid ${glyph}`,
          borderTop: `1px solid ${glyph}`,
        }}
      />
    </span>
  );
}

export { Glyph, TONES as glyphTones };
