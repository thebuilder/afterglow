"use client";

import { useCallback, useEffect, useState } from "react";

const RESET_AFTER = 2000;

function useCopied(source: string | (() => string | Promise<string>)): {
  copied: boolean;
  copy: () => void;
} {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = window.setTimeout(() => setCopied(false), RESET_AFTER);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = useCallback(() => {
    Promise.resolve(typeof source === "function" ? source() : source)
      .then((text) => navigator.clipboard.writeText(text))
      .then(() => setCopied(true))
      // A denied or unfocused clipboard leaves the control as it was, rather
      // than rejecting where the caller has nothing to catch it with.
      .catch(() => setCopied(false));
  }, [source]);

  return { copied, copy };
}

export { useCopied };
