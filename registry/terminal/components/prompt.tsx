"use client";

import { useCallback, useId, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * A line you type on.
 *
 * The sigil, the field and the caret are one row with no border between them,
 * because a shell prompt is not a form control sitting next to a label. It is a
 * single line of text, part of which happens to be editable.
 *
 * The visible label is the sigil, so the real one is hidden rather than dropped:
 * `>` tells a screen reader nothing about what to type here.
 */
function Prompt({
  className,
  sigil = ">",
  label = "Command",
  placeholder,
  onSubmit,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  sigil?: string;
  label?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
}) {
  const id = useId();
  const [value, setValue] = useState("");

  const submit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        onSubmit?.(trimmed);
        setValue("");
      }
    },
    [value, onSubmit]
  );

  const change = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setValue(event.target.value),
    []
  );

  return (
    <form
      className={cn(
        "flex items-center gap-2 border border-line bg-panel-sunken px-3 py-2 font-mono text-sm transition-[border-color,box-shadow] duration-150 ease-terminal focus-within:border-line-strong focus-within:shadow-glow",
        className
      )}
      data-slot="prompt"
      onSubmit={submit}
      {...props}
    >
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <span aria-hidden="true" className="select-none text-signal">
        {sigil}
      </span>
      <input
        autoComplete="off"
        className="min-w-0 flex-1 border-0 bg-transparent p-0 text-phosphor-bright caret-phosphor-bright outline-none placeholder:text-phosphor-dim selection:bg-signal selection:text-white"
        id={id}
        onChange={change}
        placeholder={placeholder}
        spellCheck={false}
        value={value}
      />
      <span
        aria-hidden="true"
        className="h-[1em] w-[0.5em] shrink-0 animate-caret bg-phosphor"
      />
    </form>
  );
}

export { Prompt };
