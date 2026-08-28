import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

import { Scanlines } from "@/registry/terminal/components/scanlines";

import "./globals.css";

export const metadata: Metadata = {
  description:
    "Phosphor green on unlit glass, a pink signal for events, hairline borders and no corner radius anywhere. A shadcn registry for the old-school terminal look.",
  title: "afterglow, a shadcn registry",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="relative isolate min-h-svh antialiased">
        {children}
        {/*
          Soft rather than fine, and over the whole document. At page scale the
          2-on-1 density starts eating letterforms; at 3-on-1 the glass is
          present without the body copy paying for it.
        */}
        <Scanlines density="soft" fixed vignette />
        <Analytics />
      </body>
    </html>
  );
}
