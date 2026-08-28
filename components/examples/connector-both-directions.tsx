import { Connector } from "@/registry/terminal/components/connector";

export function ConnectorBothDirections() {
  return (
    <div className="grid w-full gap-6">
      <div className="grid gap-2">
        <h3 className="font-medium font-mono text-phosphor-bright">
          Points right
        </h3>
        <Connector />
      </div>
      <div className="grid justify-items-end gap-2">
        <h3 className="font-medium font-mono text-phosphor-bright">
          Points left
        </h3>
        <Connector direction="left" />
      </div>
    </div>
  );
}
