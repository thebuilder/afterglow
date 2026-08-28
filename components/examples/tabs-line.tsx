import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/terminal/ui/tabs";

export function TabsLine() {
  return (
    <Tabs className="w-full max-w-sm" defaultValue="all">
      <TabsList variant="line">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="mounted">Mounted</TabsTrigger>
        <TabsTrigger value="down">Down</TabsTrigger>
      </TabsList>
      <TabsContent
        className="font-mono text-muted-foreground text-xs"
        value="all"
      >
        Four volumes.
      </TabsContent>
      <TabsContent
        className="font-mono text-muted-foreground text-xs"
        value="mounted"
      >
        Three volumes.
      </TabsContent>
      <TabsContent
        className="font-mono text-muted-foreground text-xs"
        value="down"
      >
        One volume.
      </TabsContent>
    </Tabs>
  );
}
