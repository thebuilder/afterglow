import { Button } from "@/registry/terminal/ui/button";

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Mount</Button>
      <Button variant="signal">Restart</Button>
      <Button variant="outline">Inspect</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="destructive">Unmount</Button>
      <Button variant="link">Read the log</Button>
    </div>
  );
}
