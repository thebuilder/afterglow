import { Badge } from "@/registry/terminal/ui/badge";

export function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>mounted</Badge>
      <Badge variant="signal">offline</Badge>
      <Badge variant="solid">primary</Badge>
      <Badge variant="outline">idle</Badge>
      <Badge variant="amber">read-only</Badge>
      <Badge variant="azure">document</Badge>
      <Badge variant="violet">audio</Badge>
      <Badge variant="destructive">corrupt</Badge>
    </div>
  );
}
