"use client";

import { useCallback, useEffect, useState } from "react";

const PHOSPHORS = [
  { color: "#86fadd", label: "Green", value: "green" },
  { color: "#ff9d4d", label: "Orange", value: "orange" },
  { color: "#f4e66d", label: "Yellow", value: "yellow" },
  { color: "#67e8f9", label: "Cyan", value: "cyan" },
  { color: "#f09be7", label: "Magenta", value: "magenta" },
  { color: "#c5cbc9", label: "Grey", value: "grey" },
] as const;

type Phosphor = (typeof PHOSPHORS)[number]["value"];

export function ThemeScreenColors() {
  const [phosphor, setPhosphor] = useState<Phosphor>("green");

  const selectPhosphor = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPhosphor(event.currentTarget.value as Phosphor);
    },
    []
  );

  useEffect(() => {
    document.documentElement.dataset.phosphor = phosphor;

    return () => {
      delete document.documentElement.dataset.phosphor;
    };
  }, [phosphor]);

  return (
    <fieldset className="grid w-fit gap-2 border border-line bg-panel-sunken p-3">
      <legend className="px-1 font-mono text-4xs text-phosphor-dim uppercase tracking-terminal-lg">
        Screen color
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {PHOSPHORS.map((option) => (
          <label
            className="group relative grid min-h-7 min-w-7 cursor-pointer place-items-center border border-line bg-panel outline-none transition-colors has-checked:border-phosphor-bright has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-phosphor-bright hover:border-line-strong"
            key={option.value}
            title={option.label}
          >
            <input
              checked={phosphor === option.value}
              className="sr-only"
              name="phosphor"
              onChange={selectPhosphor}
              type="radio"
              value={option.value}
            />
            <span
              aria-hidden="true"
              className="size-2.5 opacity-65 shadow-[0_0_8px_currentColor] transition-[opacity,transform] group-has-checked:scale-125 group-has-checked:opacity-100"
              style={{ backgroundColor: option.color, color: option.color }}
            />
            <span className="sr-only">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
