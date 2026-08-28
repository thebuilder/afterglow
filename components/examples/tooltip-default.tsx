import { SettingsIcon } from "lucide-react";
import { Button } from "@/registry/terminal/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/terminal/ui/tooltip";

export function TooltipDefault() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button size="icon" variant="outline" />}>
        <SettingsIcon />
        <span className="sr-only">Settings</span>
      </TooltipTrigger>
      <TooltipContent>Volume settings</TooltipContent>
    </Tooltip>
  );
}
