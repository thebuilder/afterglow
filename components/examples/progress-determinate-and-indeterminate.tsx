import { Progress } from "@/registry/terminal/ui/progress";

export function ProgressDeterminateAndIndeterminate() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <div className="flex items-baseline justify-between font-mono text-2xs uppercase tracking-terminal">
          <span className="text-muted-foreground">Determinate</span>
          <span className="text-metric tabular-nums">68%</span>
        </div>
        <Progress value={68} />
      </div>
      <div className="grid gap-2">
        <div className="flex items-baseline justify-between font-mono text-2xs uppercase tracking-terminal">
          <span className="text-muted-foreground">Indeterminate</span>
          <span className="text-phosphor-dim">unknown</span>
        </div>
        <Progress indeterminate />
      </div>
    </div>
  );
}
