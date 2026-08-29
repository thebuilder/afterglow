import { ExampleSource } from "@/components/docs/example-source";
import { ExampleStage } from "@/components/example-stage";
import type { LocatedExample } from "@/lib/examples";
import { exampleSource } from "@/lib/source";

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
      <ExampleSource file={source.path} html={source.html} text={source.text} />
    </div>
  );
}
