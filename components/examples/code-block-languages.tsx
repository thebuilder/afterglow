import { CodeBlock } from "@/registry/terminal/ui/code-block";

const SNIPPETS = [
  {
    code: "npx shadcn@latest add @afterglow/code-block",
    lang: "bash",
    title: "install",
  },
  {
    code: `.log {
  font-family: var(--font-mono);
  color: var(--phosphor-dim);
}`,
    lang: "css",
    title: "log.css",
  },
] as const;

export function CodeBlockLanguages() {
  return (
    <div className="grid w-full max-w-lg gap-4">
      {SNIPPETS.map((snippet) => (
        <CodeBlock
          code={snippet.code}
          key={snippet.title}
          lang={snippet.lang}
          title={snippet.title}
        />
      ))}
    </div>
  );
}
