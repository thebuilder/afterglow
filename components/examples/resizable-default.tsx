import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/terminal/ui/resizable";

export function ResizableDefault() {
  return (
    <ResizablePanelGroup className="h-40 w-full max-w-lg border border-line">
      <ResizablePanel defaultSize="40%">
        <div className="grid h-full place-items-center bg-panel font-mono text-phosphor text-xs">
          manifest
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className="grid h-full place-items-center bg-panel-sunken font-mono text-muted-foreground text-xs">
          preview
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
