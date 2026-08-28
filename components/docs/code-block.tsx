import { Highlighted } from "@/components/docs/highlighted";
import { cn } from "@/lib/utils";

/**
 * Highlighted source, with the path it installs to written above it.
 *
 * The HTML comes from Shiki at build time, so nothing here runs in a browser
 * except the copy button.
 */
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
