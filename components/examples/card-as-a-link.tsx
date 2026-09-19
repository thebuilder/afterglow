import {
  Card,
  CardAccent,
  CardDescription,
  CardHeader,
  CardLink,
  CardTitle,
} from "@/registry/terminal/ui/card";

const RELAYS = [
  {
    accent: "var(--phosphor)",
    detail: "Nominal. 41 days since the last fault.",
    name: "relay-01",
  },
  {
    accent: "var(--signal)",
    detail: "Holding at 94% of its rated load.",
    name: "relay-02",
    urgent: true,
  },
  {
    accent: "var(--amber)",
    detail: "Draining the buffer. Back in about a minute.",
    name: "relay-03",
  },
];

export function CardAsALink() {
  return (
    <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-3">
      {RELAYS.map((relay) => (
        <Card accent={relay.accent} key={relay.name}>
          {relay.urgent ? <CardAccent /> : null}
          <CardHeader>
            <CardTitle>
              <CardLink href={`#${relay.name}`}>{relay.name}</CardLink>
            </CardTitle>
            <CardDescription>{relay.detail}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
