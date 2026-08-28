import {
  Card,
  CardAccent,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/terminal/ui/card";

export function CardStripe() {
  return (
    <Card accent="var(--signal)" className="w-full max-w-sm">
      <CardAccent />
      <CardHeader>
        <CardTitle>/spool</CardTitle>
        <CardDescription>Offline since the last power cycle.</CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        The one card on the page that has to be looked at first.
      </CardContent>
    </Card>
  );
}
