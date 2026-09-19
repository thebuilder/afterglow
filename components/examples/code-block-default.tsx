import { CodeBlock } from "@/registry/terminal/ui/code-block";

const SOURCE = `import { Led } from "@/components/led";

export function Relay({ name, ok }: { name: string; ok: boolean }) {
  // The light is the status. There is no second copy of it in text.
  return (
    <p className="flex items-center gap-2 font-mono text-xs">
      <Led tone={ok ? "ok" : "error"} />
      {name}
    </p>
  );
}`;

export function CodeBlockDefault() {
  return <CodeBlock className="w-full max-w-lg" code={SOURCE} />;
}
