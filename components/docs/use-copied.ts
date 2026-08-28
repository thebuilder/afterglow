"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Put something on the clipboard, and say so for two seconds.
 *
 * The delay clears itself, because a tick still lit is a tick about a copy you
 * made a while ago.
 *
 * `read` is a promise so that a caller with the text already in hand and a
 * caller that has to fetch it can use the same hook. Give it a stable
 * reference; the effect that resets the tick is keyed on it.
 */
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
