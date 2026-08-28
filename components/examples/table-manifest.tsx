import { Badge } from "@/registry/terminal/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/terminal/ui/table";

const VOLUMES = [
  { blocks: "18 442", name: "core", state: "mounted" },
  { blocks: "4 011", name: "archive", state: "mounted" },
  { blocks: "92 780", name: "capture", state: "read-only" },
  { blocks: "612", name: "scratch", state: "mounted" },
  { blocks: "0", name: "spool", state: "offline" },
];
const STATE_VARIANT: Record<string, "default" | "signal" | "amber"> = {
  mounted: "default",
  offline: "signal",
  "read-only": "amber",
};

export function TableManifest() {
  return (
    <div className="w-full border border-line bg-panel">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Volume</TableHead>
            <TableHead>State</TableHead>
            <TableHead className="text-right">Blocks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {VOLUMES.slice(0, 3).map((volume) => (
            <TableRow key={volume.name}>
              <TableCell className="text-phosphor-bright">
                /{volume.name}
              </TableCell>
              <TableCell>
                <Badge variant={STATE_VARIANT[volume.state] ?? "default"}>
                  {volume.state}
                </Badge>
              </TableCell>
              <TableCell className="is-numeric">{volume.blocks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
