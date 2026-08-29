import { Highlighted } from "@/components/docs/highlighted";
import { cn } from "@/lib/utils";

export function CodeBlock({
  className,
  html,
  text,
  title,
}: {
  className?: string;
  html: string;
  text: string;
  title?: string;
}) {
  return (
    <figure
      className={cn("border border-line bg-panel-sunken", className)}
      data-slot="code-block"
    >
      {title ? (
        <figcaption className="border-line border-b px-3 py-2 font-mono text-2xs text-phosphor-dim tracking-terminal-xs">
          {title}
        </figcaption>
      ) : null}
      <Highlighted
        html={html}
        label={title ? `Copy ${title}` : "Copy the code"}
        text={text}
      />
    </figure>
  );
}
