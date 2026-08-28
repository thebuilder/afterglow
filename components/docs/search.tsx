"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import type { SearchRecord } from "@/lib/search";
import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/terminal/ui/command";
import { Kbd, KbdGroup } from "@/registry/terminal/ui/kbd";

/**
 * The registry, findable by typing.
 *
 * cmdk does the matching, so there is no search engine here and no index
 * format to keep in step with one. What it is given is a flat list of every
 * item, every heading on every item's page and every part with something
 * written about it, so a result can land on the paragraph rather than the page.
 *
 * The index is fetched the first time the dialog opens rather than shipped in
 * the bundle. Nobody pays for search until they use it, and the tab is open
 * long before anyone reaches for the palette.
 */
export function DocsSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState<SearchRecord[]>([]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open || records.length > 0) {
      return;
    }

    let live = true;
    fetch("/search-index.json")
      .then((response) => response.json())
      .then((loaded: SearchRecord[]) => {
        if (live) {
          setRecords(loaded);
        }
      });

    return () => {
      live = false;
    };
  }, [open, records.length]);

  const openSearch = useCallback(() => setOpen(true), []);

  const go = useCallback(
    (url: string) => {
      setOpen(false);
      router.push(url);
    },
    [router]
  );

  const groups = [...new Set(records.map((record) => record.group))];

  return (
    <>
      <button
        className={cn(
          "flex size-9 items-center justify-center gap-2.5 border border-line bg-panel-sunken text-muted-foreground outline-none transition-colors hover:border-line-strong hover:text-phosphor focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright sm:w-60 sm:justify-start sm:pr-1.5 sm:pl-3",
          className
        )}
        onClick={openSearch}
        type="button"
      >
        <SearchIcon className="size-3.5" />
        <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.1em] sm:inline">
          Search
        </span>
        <KbdGroup className="ml-auto hidden sm:flex">
          <Kbd glyph>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </button>

      <CommandDialog
        description="Every item in the registry, and every heading on its page."
        onOpenChange={setOpen}
        open={open}
        title="Search the registry"
      >
        <CommandInput placeholder="Search the registry" />
        <CommandList>
          <CommandEmpty>Nothing matches that.</CommandEmpty>
          {groups.map((group) => (
            <CommandGroup heading={group} key={group}>
              {records
                .filter((record) => record.group === group)
                .map((record) => (
                  <Result key={record.url} onSelect={go} record={record} />
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

/**
 * One row. A component of its own so the handler can be bound to the record
 * once rather than rebuilt for every row on every keystroke, which in a list of
 * several hundred is the difference between the palette keeping up and not.
 */
function Result({
  onSelect,
  record,
}: {
  onSelect: (url: string) => void;
  record: SearchRecord;
}) {
  const select = useCallback(
    () => onSelect(record.url),
    [onSelect, record.url]
  );

  return (
    <CommandItem
      onSelect={select}
      value={`${record.parent ?? ""} ${record.title} ${record.keywords}`}
    >
      <span className="text-phosphor-bright">{record.title}</span>
      {record.parent ? (
        <span className="text-phosphor-dim text-xs">{record.parent}</span>
      ) : null}
    </CommandItem>
  );
}
