"use client";

import { ThemeProvider } from "next-themes";

import { PHOSPHOR_NAMES } from "@/lib/phosphor";

export function PhosphorProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-phosphor"
      defaultTheme="green"
      disableTransitionOnChange
      enableColorScheme={false}
      enableSystem={false}
      storageKey="afterglow-phosphor"
      themes={PHOSPHOR_NAMES}
    >
      {children}
    </ThemeProvider>
  );
}
