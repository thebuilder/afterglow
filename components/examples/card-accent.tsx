import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/terminal/ui/card";

export function CardAccent() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Beam</CardTitle>
          <CardDescription>The default.</CardDescription>
        </CardHeader>
      </Card>
      <Card accent="var(--signal)">
        <CardHeader>
          <CardTitle>Signal</CardTitle>
          <CardDescription>Something is happening.</CardDescription>
        </CardHeader>
      </Card>
      <Card accent="var(--amber)">
        <CardHeader>
          <CardTitle>Amber</CardTitle>
          <CardDescription>Measured, not named.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
