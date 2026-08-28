import { ExampleSource } from "@/components/docs/example-source";
import { ExampleStage } from "@/components/example-stage";
import type { LocatedExample } from "@/lib/examples";
import { exampleSource } from "@/lib/source";

/**
 * An example, with the file it came from underneath it.
 *
 * One frame holds the component running on its ground, a hairline, and the bar
 * that opens its source. The block prints the whole file, imports included,
 * because the markup on its own leaves you guessing at where any of it came
 * from.
 */
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
