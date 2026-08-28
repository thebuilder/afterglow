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
import { Toaster, toast } from "@/registry/terminal/ui/toast";

/**
 * The two examples that need a handler, and so cannot be constructed inside a
 * server component the way every other one is.
 */

export function ToastDemo() {
  const success = useCallback(
    () =>
      toast.success("Spool mounted", {
        description: "18 442 blocks, read-write.",
      }),
    []
  );
  const warning = useCallback(
    () =>
      toast.warning("Beacon unreachable", { description: "Running local." }),
    []
  );
  const failure = useCallback(
    () =>
      toast.error("Spool did not answer", {
        description: "Power cycle it and try again.",
      }),
    []
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Toaster position="bottom-right" />
      <Button onClick={success} variant="outline">
        Success
      </Button>
      <Button onClick={warning} variant="outline">
        Warning
      </Button>
      <Button onClick={failure} variant="signal">
        Error
      </Button>
    </div>
  );
}

/**
 * The palette opens from its button and nothing else.
 *
 * ⌘K belongs to the site search, and a demo that listened for it too would
 * open two dialogs at once. The keys are still printed, as the shortcut to
 * wire up in your own app.
 */
export function CommandDialogDemo() {
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
