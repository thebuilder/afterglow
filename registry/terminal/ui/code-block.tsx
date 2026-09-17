import type * as React from "react";
import { cn } from "@/lib/utils";
import {
  type CodeLanguage,
  highlightCode,
} from "@/registry/terminal/lib/shiki";
import { CodeBlockCopy } from "@/registry/terminal/ui/code-block-copy";

async function CodeBlock({
  className,
  code,
  label,
  lang = "tsx",
  title,
  ...props
}: Omit<React.ComponentProps<"figure">, "children"> & {
  code: string;
  label?: string;
  lang?: CodeLanguage;
  title?: string;
}) {
  const text = code.trimEnd();

  return (
    <figure
      className={cn("border border-line bg-panel-sunken", className)}
      data-slot="code-block"
      {...props}
    >
      {title ? <CodeBlockTitle>{title}</CodeBlockTitle> : null}
      <CodeBlockBody
        html={await highlightCode(text, lang)}
        label={label ?? (title ? `Copy ${title}` : undefined)}
        text={text}
      />
    </figure>
  );
}

function CodeBlockTitle({
  className,
  ...props
}: React.ComponentProps<"figcaption">) {
  return (
    <figcaption
      className={cn(
        "border-line border-b px-3 py-2 font-mono text-2xs text-phosphor-dim tracking-terminal-xs",
        className
      )}
      data-slot="code-block-title"
      {...props}
    />
  );
}

function CodeBlockBody({
  className,
  html,
  label,
  text,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  html: string;
  label?: string;
  text: string;
}) {
  return (
    <div
      className={cn("relative", className)}
      data-slot="code-block-body"
      {...props}
    >
      <div
        className="[&_pre]:!bg-transparent overflow-x-auto py-3.5 pr-12 pl-4 font-mono text-xs leading-relaxed [&_pre]:outline-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki output for code the caller passed in.
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CodeBlockCopy
        className="absolute top-2.5 right-2.5"
        label={label}
        text={text}
      />
    </div>
  );
}

export { CodeBlock, CodeBlockBody, CodeBlockTitle };
