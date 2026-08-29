"use client";

import { useTheme } from "next-themes";
import { type ChangeEvent, useCallback, useSyncExternalStore } from "react";

import { PHOSPHORS } from "@/lib/phosphor";

const emptySubscribe = () => () => undefined;
const getClientSnapshot = (): boolean => true;
const getServerSnapshot = (): boolean => false;

export function ThemePhosphorSelector() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const { setTheme, theme } = useTheme();
  const selected = mounted ? theme : "green";
  const selectPhosphor = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTheme(event.currentTarget.value);
    },
    [setTheme]
  );

  return (
    <fieldset className="w-fit border border-line bg-panel-sunken px-4 pb-4">
      <legend className="px-2 font-mono text-3xs text-phosphor-dim uppercase tracking-terminal">
        Phosphor preset
      </legend>
      <div className="flex flex-wrap gap-2 pt-2">
        {PHOSPHORS.map((phosphor) => (
          <label
            className="grid size-10 cursor-pointer place-items-center border border-line bg-panel outline-none transition-colors has-[:checked]:border-phosphor-bright has-[:checked]:shadow-[0_0_12px_color-mix(in_oklab,var(--phosphor)_35%,transparent)] hover:border-phosphor focus-within:border-phosphor-bright"
            key={phosphor.value}
            title={phosphor.label}
          >
            <input
              checked={selected === phosphor.value}
              className="sr-only"
              name="phosphor"
              onChange={selectPhosphor}
              type="radio"
              value={phosphor.value}
            />
            <span
              aria-hidden="true"
              className="size-4 shadow-[0_0_10px_currentColor]"
              style={{ backgroundColor: phosphor.color, color: phosphor.color }}
            />
            <span className="sr-only">{phosphor.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
