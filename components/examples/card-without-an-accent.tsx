import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/terminal/ui/card";

export function CardWithoutAnAccent() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <Card accent={false}>
        <CardHeader>
          <CardTitle>/etc/relay.conf</CardTitle>
          <CardDescription>Last written 6 days ago.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          A hairline box on all four sides, with the title in the card's own
          color.
        </CardContent>
      </Card>
      <Card accent={false}>
        <CardHeader>
          <CardTitle>/etc/spool.conf</CardTitle>
          <CardDescription>Last written 6 days ago.</CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          Neither of these is the one to read first, so neither of them claims
          to be.
        </CardContent>
      </Card>
    </div>
  );
}
