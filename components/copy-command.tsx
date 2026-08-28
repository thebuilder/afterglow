import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";

/**
 * The install line, and a button that puts it on the clipboard.
 *
 * The `$` is decoration and is not selectable, so a drag across the line copies
 * a command rather than a command with a prompt stuck to the front of it.
 */
export function CopyCommand({
  command,
  className,
}: {
  command: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-3 border border-line bg-panel-sunken py-2 pr-2 pl-3",
        className
      )}
    >
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-phosphor text-xs">
        <span className="select-none text-phosphor-dim">$ </span>
        {command}
      </code>
      <CopyButton
        className="border-line"
        label={`Copy: ${command}`}
        text={command}
      />
    </div>
  );
}
