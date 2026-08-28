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

/** How far a row's score is cut for being a part rather than the item itself. */
const PART = 0.7;
/** And for being a heading half the registry also has. */
const SHARED_HEADING = 0.45;
/**
 * A title carrying the query whole. cmdk scores a run of letters found inside a
 * word at 0.17, below anything a phrase match is worth, so "el" would otherwise
 * rank every description mentioning a panel above `Select`.
 */
const LITERAL = 0.8;
/** A description match is worth less than a title match, however exact. */
const DESCRIPTION = 0.35;
/** Below this a match is a coincidence of letters rather than a result. */
const FLOOR = 0.01;
/** More rows than anyone scrolls, and the tail is noise by then anyway. */
const LIMIT = 40;

/** Whitespace, hoisted because the ranking runs on every keystroke. */
const WORDS = /\s+/;

function carries(text: string | undefined, term: string): boolean {
  return text?.toLowerCase().includes(term) ?? false;
}

/**
 * How well one record answers the query.
 *
 * cmdk's own filter runs one score over one string per row, which on this
 * registry puts a page's "Installation" level with the page itself and, since
 * fifty-one pages carry that heading, fills the list with rows that read alike
 * and go fifty different places. The three kinds of record are asked different
 * questions instead.
 */
function score(record: SearchRecord, query: string, words: string[]): number {
  const { parent } = record;
  const term = query.toLowerCase();

  if (!parent) {
    /* An item. A title and a slug are short enough that fuzzy matching means
       something; a sentence is not, so the description is only ever matched as
       a phrase. Spelling a query out of the letters of a description finds
       "accordion" in half the registry and then ranks the halves against each
       other for no reason. */
    return Math.max(
      defaultFilter(record.title, query, [record.name ?? ""]),
      carries(record.title, term) || carries(record.name, term) ? LITERAL : 0,
      carries(record.description, term) ? DESCRIPTION : 0
    );
  }

  if (!record.shared) {
    /* A part, or a heading no other page has. `SelectContent` is somewhere to
       go on its own, so its own title carries it, under the item it belongs to
       because somebody typing "select" wants the page first. */
    return (
      Math.max(
        defaultFilter(record.title, query, [parent]),
        carries(record.title, term) ? LITERAL : 0
      ) * PART
    );
  }

  /* A heading fifty other pages also have. "Composition" on its own is not
     anywhere, so it appears only once the query has named the item it belongs
     to, and then below that item and its parts. */
  if (!words.some((word) => defaultFilter(parent, word) > 0)) {
    return 0;
  }

  const path = `${parent} ${record.title}`;

  return (
    Math.max(defaultFilter(path, query), carries(path, term) ? LITERAL : 0) *
    SHARED_HEADING
  );
}

/**
 * The rows to draw, grouped, best group first.
 *
 * A `Map` keyed by section and filled from a list already in score order comes
 * out ordered by each section's best row, so the section a search is about is
 * at the top without sorting the sections separately.
 */
function results(records: SearchRecord[], query: string) {
  const term = query.trim();
  const words = term.split(WORDS);

  /* Nothing typed yet is a table of contents rather than a search. The headings
     and parts belong to pages nobody has asked for. */
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

/**
 * The index, and the one call that fetches it.
 *
 * A flat list of every item, every heading on every item's page and every part
 * with something written about it, so a result can land on the paragraph rather
 * than the page. It is fetched on the first sign that somebody is heading for
 * the palette rather than shipped in the bundle. Nobody pays for search until
 * they use it, and the tab is open long before anyone reaches for it.
 */
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

/** The one shortcut this site claims. */
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

/**
 * What opens the palette. A field on wide screens because that is what a reader
 * is looking for, and the icon alone once there is no room for the word.
 */
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
      {/* Hidden rather than dropped, so the icon-only button on a phone still
          has a name to announce. `display: none` takes it out of the
          accessibility tree along with the layout. */}
      <span className="sr-only font-mono text-[0.625rem] uppercase tracking-[0.1em] sm:not-sr-only sm:inline">
        Search
      </span>
      <KbdGroup className="ml-auto hidden sm:flex">
        <Kbd glyph>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </button>
  );
}

/** The registry, findable by typing. */
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
    /* cmdk scrolls the row it selects into view, which on a list that has just
       been replaced wholesale leaves the top of the new results above the fold.
       The answer to a new query starts at the top of the list. */
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
        {/* A fixed height rather than one that grows into `max-h-80`, so the
            panel is the size it will be before the index has arrived and does
            not resize under the cursor on every keystroke after. cmdk puts a
            sizer between the scroller and the rows, and it has to be told to
            fill that height or the empty state has nothing to centre in. */}
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

/** The list before the index lands, at the height the rows will be. */
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
    <CommandItem onSelect={select} value={record.url}>
      <span className="text-phosphor-bright">{record.title}</span>
      {record.parent ? (
        <span className="text-phosphor-dim text-xs">{record.parent}</span>
      ) : null}
    </CommandItem>
  );
}
