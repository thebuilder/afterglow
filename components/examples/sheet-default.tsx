import { Button } from "@/registry/terminal/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/terminal/ui/sheet";

export function SheetDefault() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        Open drawer
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Volume detail</SheetTitle>
          <SheetDescription>
            Everything the manifest knows about /capture.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-2 font-mono text-muted-foreground text-xs">
          <span>92 780 blocks</span>
          <span>mounted read-only</span>
          <span>written by the frame grabber</span>
        </div>
      </SheetContent>
    </Sheet>
  );
}
