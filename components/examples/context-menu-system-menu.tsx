"use client";

import {
  ArchiveIcon,
  CopyIcon,
  FolderInputIcon,
  RefreshCwIcon,
  Trash2Icon,
} from "lucide-react";
import { type KeyboardEvent, useState } from "react";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/registry/terminal/ui/context-menu";

function openContextMenuFromKeyboard(event: KeyboardEvent<HTMLDivElement>) {
  const isContextMenuKey = event.key === "ContextMenu";
  const isShiftF10 = event.shiftKey && event.key === "F10";

  if (!(isContextMenuKey || isShiftF10)) {
    return;
  }

  event.preventDefault();

  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.dispatchEvent(
    new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
      clientX: bounds.left + 8,
      clientY: bounds.bottom - 8,
      view: window,
    })
  );
}

export function ContextMenuSystem() {
  const [showHidden, setShowHidden] = useState(false);
  const [sort, setSort] = useState("name");

  return (
    <ContextMenu>
      <ContextMenuTrigger
        aria-label="Volume capture context menu area"
        className="grid min-h-60 w-full place-items-center border border-dashed border-line-strong bg-panel-sunken p-6 text-center outline-none focus-visible:border-phosphor focus-visible:ring-1 focus-visible:ring-phosphor data-popup-open:border-phosphor"
        onKeyDown={openContextMenuFromKeyboard}
        tabIndex={0}
      >
        <div>
          <p className="font-bold font-mono text-phosphor-bright text-xs uppercase tracking-terminal-xl">
            /volumes/capture
          </p>
          <p className="mt-2 font-mono text-muted-foreground text-xs">
            Right click, long press or press Shift+F10
          </p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuGroup>
          <ContextMenuLabel>Volume</ContextMenuLabel>
          <ContextMenuItem>
            <CopyIcon />
            Copy path
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <RefreshCwIcon />
            Refresh
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <FolderInputIcon />
              Move to
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-44">
              <ContextMenuItem>/archive</ContextMenuItem>
              <ContextMenuItem>/scratch</ContextMenuItem>
              <ContextMenuItem disabled>/system</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuCheckboxItem
            checked={showHidden}
            onCheckedChange={setShowHidden}
          >
            Show hidden files
          </ContextMenuCheckboxItem>
          <ContextMenuRadioGroup onValueChange={setSort} value={sort}>
            <ContextMenuRadioItem value="name">
              Sort by name
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="modified">
              Sort by modified
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            <ArchiveIcon />
            Archive
          </ContextMenuItem>
          <ContextMenuItem variant="destructive">
            <Trash2Icon />
            Erase volume
            <ContextMenuShortcut>⇧⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
