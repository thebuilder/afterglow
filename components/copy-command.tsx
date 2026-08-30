import { Highlighted } from "@/components/docs/highlighted";
import { cn } from "@/lib/utils";

export function CopyCommand({
  className,
  html,
  text,
}: {
  className?: string;
  html: string;
  text: string;
}) {
  return (
    <div
      className={cn("min-w-0 border border-line bg-panel-sunken", className)}
      data-slot="copy-command"
    >
      <Highlighted html={html} label={`Copy: ${text}`} text={text} />
    </div>
  );
}
