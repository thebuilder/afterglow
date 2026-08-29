"use client";

import { useCallback, useEffect, useState } from "react";

export function useCopied(read: () => Promise<string>) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = useCallback(() => {
    read()
      .then((text) => navigator.clipboard.writeText(text))
      .then(() => setCopied(true));
  }, [read]);

  return { copied, copy };
}
