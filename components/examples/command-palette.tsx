"use client";

import { FileIcon, FolderIcon, PowerIcon, TerminalIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/registry/terminal/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/registry/terminal/ui/command";
import { Kbd, KbdGroup } from "@/registry/terminal/ui/kbd";

/**
 * The palette opens from its button and nothing else.
 *
 * ⌘K belongs to the site search, and a demo that listened for it too would
 * open two dialogs at once. The keys are still printed, as the shortcut to
 * wire up in your own app.
 */
export function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);

  return (
    <div className="grid justify-items-center gap-4">
      <Button onClick={open} variant="outline">
        <TerminalIcon />
        Open palette
      </Button>
      <p className="flex items-center gap-2 font-mono text-[0.625rem] text-phosphor-dim uppercase tracking-[0.1em]">
        wire it to
        <KbdGroup>
          <Kbd glyph>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </p>
      <CommandDialog onOpenChange={setOpen} open={isOpen}>
        <CommandInput placeholder="Type a command or search a volume." />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Volumes">
            <CommandItem>
              <FolderIcon />
              /core
              <CommandShortcut>18 442</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FolderIcon />
              /archive
              <CommandShortcut>4 011</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <FileIcon />
              notes.txt
              <CommandShortcut>2 KB</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Actions">
            <CommandItem>
              <PowerIcon />
              Restart spool
              <CommandShortcut>⇧R</CommandShortcut>
            </CommandItem>
            <CommandItem disabled>
              <TerminalIcon />
              Attach console
              <CommandShortcut>⇧C</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
