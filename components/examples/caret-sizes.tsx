import { Caret } from "@/registry/terminal/components/caret";

export function CaretSizes() {
  return (
    <div className="grid gap-4 font-mono text-phosphor-bright">
      <p className="text-xs">
        Small
        <Caret className="ml-1" />
      </p>
      <p className="text-base">
        Default
        <Caret className="ml-1" />
      </p>
      <p className="text-xl">
        Large
        <Caret className="ml-1" />
      </p>
    </div>
  );
}
