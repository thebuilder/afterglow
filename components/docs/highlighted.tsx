import { CopyButton } from "@/components/docs/copy-button";
import { cn } from "@/lib/utils";

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
        // biome-ignore lint/security/noDangerouslySetInnerHtml: build-time Shiki output from repository source.
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
