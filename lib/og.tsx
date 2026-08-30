import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { HOMEPAGE } from "@/lib/registry";
import { stripInlineMarkdown } from "@/lib/text";
import { palette } from "@/registry/terminal/theme.mjs";

export const OG_SIZE = { height: 630, width: 1200 };
export const OG_CONTENT_TYPE = "image/png";

const LINE = palette.line;
const PHOSPHOR = palette.phosphor;
const PHOSPHOR_BRIGHT = palette["phosphor-bright"];
const PHOSPHOR_DIM = palette["phosphor-dim"];
const SIGNAL = palette.signal;
const VOID = palette.void;

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
          // biome-ignore lint/suspicious/noArrayIndexKey: the row index is the position.
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
    stripInlineMarkdown(text)
  );
}

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

      {/* Satori drops the `inset` shorthand. */}
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
