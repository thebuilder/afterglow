import { Button } from "@/registry/terminal/ui/button";
import { Input } from "@/registry/terminal/ui/input";
import { Label } from "@/registry/terminal/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/terminal/ui/popover";

export function PopoverDefault() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Rename volume
      </PopoverTrigger>
      <PopoverContent className="grid gap-3">
        <div className="grid gap-1">
          <p className="font-medium font-mono text-phosphor-bright text-sm">
            Rename
          </p>
          <p className="text-muted-foreground text-xs">
            The label the manifest shows. The mount point does not change.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ex-pop">Label</Label>
          <Input defaultValue="capture" id="ex-pop" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
