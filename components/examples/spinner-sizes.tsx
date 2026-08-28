import { Spinner } from "@/registry/terminal/ui/spinner";

export function SpinnerSizes() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner />
      <Spinner className="size-6" />
      <Spinner className="size-10 gap-0.5" />
      <span className="flex items-center gap-2.5 font-mono text-muted-foreground text-xs">
        <Spinner />
        indexing
      </span>
    </div>
  );
}
