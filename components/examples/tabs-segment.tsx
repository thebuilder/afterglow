import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/terminal/ui/tabs";

export function TabsSegment() {
  return (
    <Tabs className="w-full max-w-sm" defaultValue="manifest">
      <TabsList>
        <TabsTrigger value="manifest">Manifest</TabsTrigger>
        <TabsTrigger value="hex">Hex</TabsTrigger>
        <TabsTrigger value="meta">Meta</TabsTrigger>
      </TabsList>
      <TabsContent
        className="font-mono text-muted-foreground text-xs"
        value="manifest"
      >
        412 entries, 3 locked.
      </TabsContent>
      <TabsContent
        className="font-mono text-muted-foreground text-xs"
        value="hex"
      >
        00000000 7f 45 4c 46 02 01 01 00
      </TabsContent>
      <TabsContent
        className="font-mono text-muted-foreground text-xs"
        value="meta"
      >
        Written 04:12, never read.
      </TabsContent>
    </Tabs>
  );
}
