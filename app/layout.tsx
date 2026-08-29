import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";

import { PhosphorProvider } from "@/components/phosphor-provider";
import { HOMEPAGE } from "@/lib/registry";
import { Scanlines } from "@/registry/terminal/components/scanlines";

import "./globals.css";
import "./site.css";

const DESCRIPTION =
  "A complete terminal UI system for shadcn. Install the shared theme, Base UI components, and terminal-specific building blocks into your project.";
const TITLE = "afterglow, terminal UI for shadcn";
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--afterglow-font-mono",
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--afterglow-font-sans",
  weight: "variable",
});

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
    <html
      className={`${ibmPlexMono.variable} ${inter.variable}`}
      lang="en"
      suppressHydrationWarning
    >
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
