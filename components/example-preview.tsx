import { ExampleSource } from "@/components/docs/example-source";
import { ExampleStage } from "@/components/example-stage";
import type { LocatedExample } from "@/lib/examples";
import { exampleSource } from "@/lib/source";
import { highlightCode } from "@/registry/terminal/lib/shiki";
import { CodeBlockBody } from "@/registry/terminal/ui/code-block";

export async function ExamplePreview({
  className,
  example,
  item,
}: {
  className?: string;
  example: LocatedExample;
  item: string;
}) {
  const source = await exampleSource(example.file);
  const Component = example.component;

  return (
    <div className={className}>
      <ExampleStage item={item}>
        <Component />
      </ExampleStage>
      <ExampleSource file={source.path}>
        <CodeBlockBody
          className="border-line border-t"
          html={await highlightCode(source.text, "tsx")}
          label={`Copy ${source.path}`}
          text={source.text}
        />
      </ExampleSource>
    </div>
  );
}
