import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";

/**
 * Shiki's output, painted to match the panel it sits on, with the copy button
 * over it.
 *
 * Shiki paints its own background onto the `<pre>`; the override below strips
 * it, because the frame is already the panel colour and two backgrounds a shade
 * apart look like a rendering fault rather than depth.
 *
 * Split out from the block that frames it, because a code block and an
 * example's source want the same code and different furniture around it.
 */
export function Highlighted({
  className,
  html,
  label,
  text,
}: {
  className?: string;
  html: string;
  label: string;
  text: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="[&_pre]:!bg-transparent overflow-x-auto py-3.5 pr-12 pl-4 font-mono text-xs leading-relaxed [&_pre]:outline-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki's output is generated here at build time from files in this repository.
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CopyButton
        className="absolute top-2.5 right-2.5"
        label={label}
        text={text}
      />
    </div>
  );
}
