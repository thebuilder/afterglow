import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";

/**
 * Highlighted source, with the path it installs to written above it.
 *
 * The HTML comes from Shiki at build time, so nothing here runs in a browser
 * except the copy button. Shiki paints its own background onto the `<pre>`; the
 * override below strips it, because the frame is already the panel colour and
 * two backgrounds a shade apart look like a rendering fault rather than depth.
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
        <figcaption className="border-line border-b px-3 py-2 font-mono text-[0.625rem] text-phosphor-dim tracking-[0.06em]">
          {title}
        </figcaption>
      ) : null}
      <div className="relative">
        <div
          className="[&_pre]:!bg-transparent overflow-x-auto py-3.5 pr-12 pl-4 font-mono text-xs leading-relaxed [&_pre]:outline-none"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki's output is generated here at build time from files in this repository.
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <CopyButton
          className="absolute top-2.5 right-2.5"
          label={title ? `Copy ${title}` : "Copy the code"}
          text={text}
        />
      </div>
    </figure>
  );
}
