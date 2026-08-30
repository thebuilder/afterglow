import { Progress } from "@/registry/terminal/ui/progress";

export function ProgressSegmented() {
  return (
    <div className="grid w-full max-w-sm gap-5">
      <div className="grid gap-2">
        <div className="flex items-baseline justify-between font-mono text-2xs uppercase tracking-terminal">
          <span className="text-muted-foreground">Core load</span>
          <span className="text-metric tabular-nums">62%</span>
        </div>
        <Progress cells={24} value={62} />
      </div>
      <div className="grid gap-2">
        <div className="flex items-baseline justify-between font-mono text-2xs uppercase tracking-terminal">
          <span className="text-muted-foreground">Linking registry</span>
          <span className="text-phosphor-dim">unknown</span>
        </div>
        <Progress cells={24} indeterminate />
      </div>
    </div>
  );
}
