import { PowerIcon, SearchIcon } from "lucide-react";
import { Button } from "@/registry/terminal/ui/button";

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="outline">
        <SearchIcon />
        <span className="sr-only">Search</span>
      </Button>
      <Button size="icon-sm" variant="outline">
        <PowerIcon />
        <span className="sr-only">Power</span>
      </Button>
    </div>
  );
}
