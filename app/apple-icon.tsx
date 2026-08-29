import { ImageResponse } from "next/og";

import { palette } from "@/registry/terminal/theme.mjs";

export const size = { height: 180, width: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: palette.void,
        display: "flex",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <svg
        aria-hidden="true"
        fill="none"
        height="126"
        viewBox="0 0 32 32"
        width="126"
      >
        <path
          d="M7 10 L14 16 L7 22"
          stroke={palette.phosphor}
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="5"
        />
        <rect fill={palette.phosphor} height="4" width="10" x="18" y="20" />
      </svg>
    </div>,
    size
  );
}
