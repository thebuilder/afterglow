import { Spinner } from "@/registry/terminal/ui/spinner";

export function SpinnerVariants() {
  return (
    <div className="grid gap-5 font-mono text-muted-foreground text-xs">
      <span className="flex items-center gap-2.5">
        <Spinner />
        pixel, a lit cell running the ring
      </span>
      <span className="flex items-center gap-2.5">
        <Spinner variant="line" />
        line, one glyph a frame
      </span>
      <span className="flex items-center gap-3 text-base text-phosphor">
        <Spinner variant="line" />
        <span className="text-foreground">linking registry</span>
      </span>
    </div>
  );
}
