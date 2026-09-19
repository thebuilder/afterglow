import { CodeBlock } from "@/registry/terminal/ui/code-block";

const CONFIG = `{
  "registries": {
    "@afterglow": "https://afterglow.thebuilder.dk/r/{name}.json"
  }
}`;

export function CodeBlockWithATitle() {
  return (
    <CodeBlock
      className="w-full max-w-lg"
      code={CONFIG}
      lang="json"
      title="components.json"
    />
  );
}
