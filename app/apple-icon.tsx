import { ImageResponse } from "next/og";

export const size = { height: 180, width: 180 };
export const contentType = "image/png";

/**
 * iOS ignores the SVG favicon and screenshots the page instead, so the mark is
 * drawn again at 180. Shapes rather than a glyph, which keeps this free of the
 * font the OG card has to load.
 */
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#05090a",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      {/*
        126 inside 180 leaves room for the rounding iOS applies, and satori
        paints an SVG <title> as visible text, so the mark is labelled by
        the route instead.
      */}
      <svg
        aria-hidden="true"
        fill="none"
        height="126"
        viewBox="0 0 32 32"
        width="126"
      >
        <path
          d="M7 10 L14 16 L7 22"
          stroke="#86fadd"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="5"
        />
        <rect fill="#86fadd" height="4" width="10" x="18" y="20" />
      </svg>
    </div>,
    size
  );
}
