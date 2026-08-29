"use client";

import { defaultFilter } from "cmdk";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
import { Skeleton } from "@/registry/terminal/ui/skeleton";

const PART = 0.7;

const SHARED_HEADING = 0.45;

const LITERAL = 0.8;

const DESCRIPTION = 0.35;

const FLOOR = 0.01;

const LIMIT = 40;

const WORDS = /\s+/;

function carries(text: string | undefined, term: string): boolean {
  return text?.toLowerCase().includes(term) ?? false;
}

// Item pages outrank parts. Shared headings require a parent-item match.
function score(record: SearchRecord, query: string, words: string[]): number {
  const { parent } = record;
  const term = query.toLowerCase();

  if (!parent) {
    return Math.max(
      defaultFilter(record.title, query, [record.name ?? ""]),
      carries(record.title, term) || carries(record.name, term) ? LITERAL : 0,
      carries(record.description, term) ? DESCRIPTION : 0
    );
  }

  if (!record.shared) {
    return (
      Math.max(
        defaultFilter(record.title, query, [parent]),
        carries(record.title, term) ? LITERAL : 0
      ) * PART
    );
  }

  if (!words.some((word) => defaultFilter(parent, word) > 0)) {
    return 0;
  }

  const path = `${parent} ${record.title}`;

  return (
    Math.max(defaultFilter(path, query), carries(path, term) ? LITERAL : 0) *
    SHARED_HEADING
  );
}

function results(records: SearchRecord[], query: string) {
  const term = query.trim();
  const words = term.split(WORDS);

  const rows = term
    ? records
        .map((record) => ({ record, score: score(record, term, words) }))
        .filter((row) => row.score > FLOOR)
        .sort((a, b) => b.score - a.score)
        .slice(0, LIMIT)
        .map((row) => row.record)
    : records.filter((record) => !record.parent);

  const groups = new Map<string, SearchRecord[]>();

  for (const record of rows) {
    const bucket = groups.get(record.group);

    if (bucket) {
      bucket.push(record);
    } else {
      groups.set(record.group, [record]);
    }
  }

  return [...groups];
}

function useSearchIndex(open: boolean): [SearchRecord[], () => void] {
  const [records, setRecords] = useState<SearchRecord[]>([]);

  const load = useCallback(() => {
    if (records.length > 0) {
      return;
    }

    fetch("/search-index.json")
      .then((response) => response.json())
      .then((loaded: SearchRecord[]) => setRecords(loaded));
  }, [records.length]);

  useEffect(() => {
    if (open) {
      load();
    }
  }, [load, open]);

  return [records, load];
}

function useCommandKey(toggle: () => void) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [toggle]);
}

function Trigger({
  className,
  onOpen,
  onIntent,
}: {
  className?: string;
  onOpen: () => void;
  onIntent: () => void;
}) {
  return (
    <button
      className={cn(
        "flex size-9 items-center justify-center gap-2.5 border border-line bg-panel-sunken text-muted-foreground outline-none transition-colors hover:border-line-strong hover:text-phosphor focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright sm:w-60 sm:justify-start sm:pr-1.5 sm:pl-3",
        className
      )}
      onClick={onOpen}
      onFocus={onIntent}
      onPointerEnter={onIntent}
      type="button"
    >
      <SearchIcon className="size-3.5" />
      <span className="sr-only font-mono text-2xs uppercase tracking-terminal sm:not-sr-only sm:inline">
        Search
      </span>
      <KbdGroup className="ml-auto hidden sm:flex">
        <Kbd glyph>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </button>
  );
}

export function DocsSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [records, load] = useSearchIndex(open);
  const list = useRef<HTMLDivElement>(null);

  useCommandKey(useCallback(() => setOpen((previous) => !previous), []));

  const grouped = useMemo(() => results(records, query), [query, records]);

  const onQueryChange = useCallback((next: string) => {
    setQuery(next);

    list.current?.scrollTo({ top: 0 });
  }, []);

  const openSearch = useCallback(() => setOpen(true), []);

  const onOpenChange = useCallback((next: boolean) => {
    setOpen(next);

    if (!next) {
      setQuery("");
    }
  }, []);

  const go = useCallback(
    (url: string) => {
      setOpen(false);
      setQuery("");
      router.push(url);
    },
    [router]
  );

  const loading = records.length === 0;

  return (
    <>
      <Trigger className={className} onIntent={load} onOpen={openSearch} />

      <CommandDialog
        description="Search components and documentation."
        onOpenChange={onOpenChange}
        open={open}
        shouldFilter={false}
        title="Search the registry"
      >
        <CommandInput
          onValueChange={onQueryChange}
          placeholder="Search the registry"
          value={query}
        />
        {/* Fixed height prevents loading and result changes from resizing the dialog. */}
        <CommandList
          className="h-80 [&>[cmdk-list-sizer]]:flex [&>[cmdk-list-sizer]]:min-h-full [&>[cmdk-list-sizer]]:flex-col"
          ref={list}
        >
          {loading ? <Placeholder /> : null}
          {loading || grouped.length > 0 ? null : (
            <CommandEmpty className="flex flex-1 items-center justify-center py-0">
              Nothing matches that.
            </CommandEmpty>
          )}
          {grouped.map(([group, rows]) => (
            <CommandGroup heading={group} key={group}>
              {rows.map((record) => (
                <Result key={record.url} onSelect={go} record={record} />
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

const PLACEHOLDER_ROWS = [40, 28, 34, 24, 44, 30, 36, 26];

function Placeholder() {
  return (
    <div aria-hidden="true" className="p-1">
      {PLACEHOLDER_ROWS.map((width) => (
        <div className="flex h-9 items-center px-2" key={width}>
          <Skeleton className="h-3" style={{ width: `${width}%` }} />
        </div>
      ))}
    </div>
  );
}

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
    <CommandItem onSelect={select} value={record.url}>
      <span className="text-phosphor-bright">{record.title}</span>
      {record.parent ? (
        <span className="text-phosphor-dim text-xs">{record.parent}</span>
      ) : null}
    </CommandItem>
  );
}
