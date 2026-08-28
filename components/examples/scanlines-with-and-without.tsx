import { Screen } from "@/registry/terminal/components/screen";

export function ScanlinesWithAndWithout() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2">
      <div className="relative isolate grid h-28 place-items-center border border-line bg-panel font-mono text-phosphor text-sm">
        without
      </div>
      <Screen className="grid h-28 place-items-center bg-panel font-mono text-phosphor text-sm">
        with
      </Screen>
    </div>
  );
}
