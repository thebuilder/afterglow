import { Button } from "@/registry/terminal/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/terminal/ui/card";

export function CardWithAnAction() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>/queue</CardTitle>
        <CardDescription>
          Three jobs held since the paper tray ran out.
        </CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Flush
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        Flushing drops them without printing. The printer gets no say.
      </CardContent>
    </Card>
  );
}
