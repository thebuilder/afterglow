import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { HOMEPAGE } from "@/lib/registry";

export const OG_SIZE = { height: 630, width: 1200 };
export const OG_CONTENT_TYPE = "image/png";

const VOID = "#05090a";
const PHOSPHOR = "#86fadd";
const PHOSPHOR_BRIGHT = "#d9ffef";
const PHOSPHOR_DIM = "#4d8477";
const SIGNAL = "#ff5b82";
const LINE = "rgba(132,255,224,0.22)";

/**
 * Satori has no font stack to fall back on, so the mono has to be handed to it
 * as bytes. The two latin subsets are 13KB each and live in `assets/`, which is
 * documentation-site territory and never reaches a consumer.
 */
async function fonts() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "assets/ibm-plex-mono-latin-400.woff")),
    readFile(join(process.cwd(), "assets/ibm-plex-mono-latin-700.woff")),
  ]);

  return [
    {
      data: regular,
      name: "IBM Plex Mono",
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      data: bold,
      name: "IBM Plex Mono",
      style: "normal" as const,
      weight: 700 as const,
    },
  ];
}

/**
 * The glass, as elements.
 *
 * The site paints scanlines with a repeating gradient in a `@utility`, which
 * satori does not implement. One absolutely positioned rule every four pixels
 * is the same picture by a duller route, and 157 empty divs cost nothing at
 * build time.
 */
function Scanlines() {
  return (
    <div
      style={{
        display: "flex",
        height: OG_SIZE.height,
        left: 0,
        position: "absolute",
        top: 0,
        width: OG_SIZE.width,
      }}
    >
      {Array.from({ length: Math.ceil(OG_SIZE.height / 4) }, (_, row) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: the rules are a fixed grid, and the index is the row.
          key={row}
          style={{
            background: "rgba(134,250,221,0.05)",
            height: 1,
            left: 0,
            position: "absolute",
            top: row * 4,
            width: OG_SIZE.width,
          }}
        />
      ))}
    </div>
  );
}

function Prompt({ size }: { size: number }) {
  return (
    <div
      style={{
        color: PHOSPHOR,
        display: "flex",
        fontSize: size,
        fontWeight: 700,
        letterSpacing: -size * 0.06,
        lineHeight: 1,
      }}
    >
      &gt;_
    </div>
  );
}

/**
 * Backticks are markup the card has no way to render, and the symbols only
 * exist in a font this build does not ship. Left alone, satori goes to the
 * network for a face that covers them, which fails in CI and drops the glyph
 * without saying so. The site keeps the real characters; the picture spells
 * them out.
 */
const SUBSTITUTIONS: [RegExp, string][] = [
  [/`/g, ""],
  [/⌘/g, "Cmd"],
  [/⇧/g, "Shift"],
  [/↵/g, "Enter"],
  [/•/g, "o"],
  [/▋/g, "block"],
];

function plain(text: string): string {
  return SUBSTITUTIONS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    text
  );
}

/**
 * One card, two callers. The root page passes the registry's own pitch; an item
 * page passes its name and description, so a link to `/c/slider` previews as
 * that item rather than as the site again.
 */
export async function ogImage({
  eyebrow,
  title,
  body,
  meta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  meta: string;
}) {
  return new ImageResponse(
    <div
      style={{
        background: VOID,
        color: PHOSPHOR,
        display: "flex",
        flexDirection: "column",
        fontFamily: "IBM Plex Mono",
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      <Scanlines />

      {/*
        Satori drops the `inset` shorthand, so the frame is placed by four
        explicit offsets. Left as `inset`, it collapses to the size of its own
        text in the top-left corner.
      */}
      <div
        style={{
          border: `1px solid ${LINE}`,
          bottom: 48,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          left: 48,
          padding: 56,
          position: "absolute",
          right: 48,
          top: 48,
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 20 }}>
          <Prompt size={44} />
          <div
            style={{
              color: PHOSPHOR_BRIGHT,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 4.8,
            }}
          >
            AFTERGLOW
          </div>
          <div
            style={{
              color: PHOSPHOR_DIM,
              fontSize: 17,
              letterSpacing: 1.7,
              marginLeft: 6,
              marginTop: 4,
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              color: PHOSPHOR_BRIGHT,
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.06,
              maxWidth: 940,
            }}
          >
            {plain(title)}
          </div>
          <div
            style={{ background: LINE, display: "flex", height: 1, width: 180 }}
          />
          <div
            style={{
              color: PHOSPHOR,
              display: "flex",
              fontSize: 25,
              lineHeight: 1.45,
              maxWidth: 900,
              opacity: 0.82,
            }}
          >
            {plain(body)}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 18,
            justifyContent: "space-between",
            letterSpacing: 1.8,
          }}
        >
          <div style={{ color: PHOSPHOR_DIM, display: "flex" }}>
            {HOMEPAGE.replace("https://", "")}
          </div>
          <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
            <div
              style={{
                background: SIGNAL,
                display: "flex",
                height: 9,
                width: 9,
              }}
            />
            <div style={{ color: PHOSPHOR_DIM, display: "flex" }}>{meta}</div>
          </div>
        </div>
      </div>
    </div>,
    { ...OG_SIZE, fonts: await fonts() }
  );
}
