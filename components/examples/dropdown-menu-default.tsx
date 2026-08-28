import { CopyIcon, EllipsisIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/registry/terminal/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/terminal/ui/dropdown-menu";

export function DropdownMenuDefault() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size="icon" variant="outline" />}>
        <EllipsisIcon />
        <span className="sr-only">Actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>/capture</DropdownMenuLabel>
          <DropdownMenuItem>
            <CopyIcon />
            Copy path
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <Trash2Icon />
            Unmount
            <DropdownMenuShortcut>⇧⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
