import { FolderOpenIcon } from "lucide-react";
import { Button } from "@/registry/terminal/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/terminal/ui/empty";

export function EmptyDefault() {
  return (
    <Empty className="w-full max-w-md">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon />
        </EmptyMedia>
        <EmptyTitle>No volumes mounted</EmptyTitle>
        <EmptyDescription>
          Nothing has answered since the last power cycle.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          Rescan
        </Button>
      </EmptyContent>
    </Empty>
  );
}
