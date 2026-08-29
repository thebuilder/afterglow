import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

import { PhosphorProvider } from "@/components/phosphor-provider";
import { HOMEPAGE } from "@/lib/registry";
import { Scanlines } from "@/registry/terminal/components/scanlines";

import "./globals.css";
import "./site.css";

const DESCRIPTION =
  "A complete terminal UI system for shadcn. Install the shared theme, Base UI components, and terminal-specific building blocks into your project.";
const TITLE = "afterglow, terminal UI for shadcn";

export const metadata: Metadata = {
  alternates: { canonical: HOMEPAGE },
  description: DESCRIPTION,

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
    <html lang="en" suppressHydrationWarning>
      <body className="relative isolate min-h-svh antialiased">
        <PhosphorProvider>
          {children}
          <Scanlines density="soft" fixed vignette />
          <Analytics />
        </PhosphorProvider>
      </body>
    </html>
  );
}
