import { Button } from "@/registry/terminal/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/terminal/ui/card";

export function CardDefault() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>/capture</CardTitle>
        <CardDescription>92 780 blocks, mounted read-only.</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        Written by the frame grabber. Nothing else has a handle on it.
      </CardContent>
      <CardFooter className="border-line border-t">
        <Button size="sm" variant="outline">
          Remount
        </Button>
      </CardFooter>
    </Card>
  );
}
