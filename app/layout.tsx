import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import { SiteGlass } from "@/components/docs/site-glass";
import { PhosphorProvider } from "@/components/phosphor-provider";
import { HOMEPAGE } from "@/lib/registry";

import "./globals.css";
import "./site.css";

const DESCRIPTION =
  "Install terminal-inspired React components through the shadcn CLI. Built on Base UI, with CRT effects and eight phosphor themes. The source stays in your codebase.";
const TITLE = "Afterglow | Terminal UI for shadcn projects";
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
  description: DESCRIPTION,

  metadataBase: new URL(HOMEPAGE),
  openGraph: {
    description: DESCRIPTION,
    siteName: "Afterglow",
    title: TITLE,
    type: "website",
    url: HOMEPAGE,
  },
  title: { default: TITLE, template: "%s | Afterglow" },
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
          <SiteGlass />
          <Analytics />
        </PhosphorProvider>
      </body>
    </html>
  );
}
