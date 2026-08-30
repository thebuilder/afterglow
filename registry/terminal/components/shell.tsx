"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useCallback, useId, useState } from "react";

import { cn } from "@/lib/utils";

const shellLineVariants = cva("min-h-5", {
  defaultVariants: { tone: "default" },
  variants: {
    tone: {
      command: "text-phosphor-bright",
      default: "text-phosphor",
      error: "text-signal",
      muted: "text-phosphor-dim",
      warning: "text-warning",
    },
  },
});

function Shell({
  className,
  children,
  "aria-label": label = "Shell",
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      aria-label={label}
      className={cn(
        "flex min-h-48 flex-col gap-3 border border-line bg-panel-sunken p-4 font-mono text-xs shadow-panel",
        className
      )}
      data-slot="shell"
      {...props}
    >
      {children}
    </section>
  );
}

function ShellOutput({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-live="polite"
      aria-relevant="additions text"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto overscroll-contain whitespace-pre-wrap",
        className
      )}
      data-slot="shell-output"
      role="log"
      {...props}
    />
  );
}

function ShellLine({
  className,
  tone,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof shellLineVariants>) {
  return (
    <div
      className={cn(shellLineVariants({ tone }), className)}
      data-slot="shell-line"
      {...props}
    />
  );
}

function ShellCommand({
  className,
  children,
  prompt = "$",
  ...props
}: React.ComponentProps<"div"> & { prompt?: string }) {
  return (
    <div
      className={cn("flex min-h-5 gap-2 text-phosphor-bright", className)}
      data-slot="shell-command"
      {...props}
    >
      <span aria-hidden="true" className="shrink-0 text-signal">
        {prompt}
      </span>
      <span className="min-w-0 break-words">{children}</span>
    </div>
  );
}

function ShellPrompt({
  className,
  label = "Command",
  onSubmit,
  placeholder,
  prompt = "$",
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  label?: string;
  onSubmit?: (command: string) => void;
  placeholder?: string;
  prompt?: string;
}) {
  const id = useId();
  const [history, setHistory] = useState<readonly string[]>([]);
  const [recall, setRecall] = useState(-1);
  const [value, setValue] = useState("");

  const submit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const command = value.trim();
      if (!command) {
        return;
      }

      onSubmit?.(command);
      setHistory((current) => [command, ...current].slice(0, 40));
      setRecall(-1);
      setValue("");
    },
    [onSubmit, value]
  );

  const recallCommand = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        (event.key !== "ArrowUp" && event.key !== "ArrowDown") ||
        history.length === 0
      ) {
        return;
      }

      event.preventDefault();
      const next =
        event.key === "ArrowUp"
          ? Math.min(recall + 1, history.length - 1)
          : Math.max(recall - 1, -1);
      setRecall(next);
      setValue(next === -1 ? "" : (history[next] ?? ""));
    },
    [history, recall]
  );

  const updateValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  return (
    <form
      className={cn(
        "group/shell-prompt flex items-baseline gap-2 border-line border-t pt-3 text-base focus-within:border-line-strong sm:text-xs",
        className
      )}
      data-slot="shell-prompt"
      onSubmit={submit}
      {...props}
    >
      <label className="sr-only" htmlFor={id}>
        {label}
      </label>
      <span
        aria-hidden="true"
        className="shrink-0 text-signal group-has-[:focus-visible]/shell-prompt:text-phosphor-bright"
      >
        {prompt}
      </span>
      <input
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-phosphor-bright caret-phosphor-bright outline-none placeholder:text-phosphor-dim selection:bg-signal selection:text-white focus-visible:outline-0"
        id={id}
        onChange={updateValue}
        onKeyDown={recallCommand}
        placeholder={placeholder}
        spellCheck={false}
        value={value}
      />
    </form>
  );
}

export { Shell, ShellCommand, ShellLine, ShellOutput, ShellPrompt };
