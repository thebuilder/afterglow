import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

import { HOMEPAGE } from "@/lib/registry";
import { Scanlines } from "@/registry/terminal/components/scanlines";

import "./globals.css";

const DESCRIPTION =
  "Old-school terminal UI for shadcn. Phosphor green, pink signals, hairline borders and square corners. Install the registry or add components one at a time.";
const TITLE = "afterglow, terminal UI for shadcn";

export const metadata: Metadata = {
  alternates: { canonical: HOMEPAGE },
  description: DESCRIPTION,
  /*
    `metadataBase` gives the file-based Open Graph images absolute URLs that
    crawlers can fetch.
  */
  metadataBase: new URL(HOMEPAGE),
  openGraph: {
    description: DESCRIPTION,
    siteName: "afterglow",
    title: TITLE,
    type: "website",
    url: HOMEPAGE,
  },
  title: { default: TITLE, template: "%s, afterglow" },
  twitter: {
    card: "summary_large_image",
    description: DESCRIPTION,
    title: TITLE,
  },
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
