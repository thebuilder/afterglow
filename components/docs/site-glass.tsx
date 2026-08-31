"use client";

import { useSyncExternalStore } from "react";

import { Scanlines } from "@/registry/terminal/components/scanlines";

let lit = true;
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

const getSnapshot = () => lit;
const getServerSnapshot = () => true;

export function useSiteGlass(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setSiteGlass(next: boolean) {
  lit = next;
  for (const listener of listeners) {
    listener();
  }
}

export function SiteGlass() {
  return useSiteGlass() ? <Scanlines density="soft" fixed /> : null;
}
