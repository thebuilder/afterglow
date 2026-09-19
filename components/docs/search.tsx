"use client";

import { defaultFilter } from "cmdk";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import type { SearchRecord } from "@/lib/search";
import { cn } from "@/lib/utils";
import {
  Command,
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

const WORDS = /\s+/u;

const APPLE_DEVICE = /Mac|iPhone|iPad|iPod/u;

const subscribeToPlatform = () => () => {
  // Nothing to tear down: the platform does not change after hydration.
};

type ShortcutModifier = "Ctrl" | "⌘";

function getShortcutModifier(): ShortcutModifier {
  return APPLE_DEVICE.test(navigator.userAgent) ? "⌘" : "Ctrl";
}

const getServerShortcutModifier = (): ShortcutModifier => "Ctrl";

function useShortcutModifier() {
  return useSyncExternalStore(
    subscribeToPlatform,
    getShortcutModifier,
    getServerShortcutModifier
  );
}

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
        .toSorted((a, b) => b.score - a.score)
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

type SearchStatus = "idle" | "loading" | "ready" | "error";

function useSearchIndex() {
  const [records, setRecords] = useState<SearchRecord[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const pending = useRef<boolean>(false);

  const load = useCallback(() => {
    if (pending.current || status === "ready") {
      return;
    }

    pending.current = true;
    setStatus("loading");
    fetch("/search-index.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Search index request failed");
        }
        return response.json();
      })
      .then((loaded: SearchRecord[]) => {
        if (!Array.isArray(loaded)) {
          throw new TypeError("Invalid search index");
        }
        setRecords(loaded);
        setStatus("ready");
      })
      .catch(() => setStatus("error"))
      .finally(() => {
        pending.current = false;
      });
  }, [status]);

  return { load, records, status };
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

function useSearchViewport() {
  useEffect(() => {
    const root = document.documentElement;
    const viewport = window.visualViewport;
    const properties = {
      height: "--site-search-viewport-height",
      left: "--site-search-viewport-left",
      top: "--site-search-viewport-top",
      width: "--site-search-viewport-width",
    } as const;

    const update = () => {
      root.style.setProperty(
        properties.height,
        `${viewport?.height ?? window.innerHeight}px`
      );
      root.style.setProperty(properties.left, `${viewport?.offsetLeft ?? 0}px`);
      root.style.setProperty(properties.top, `${viewport?.offsetTop ?? 0}px`);
      root.style.setProperty(
        properties.width,
        `${viewport?.width ?? window.innerWidth}px`
      );
    };

    update();
    window.addEventListener("resize", update);
    viewport?.addEventListener("resize", update);
    viewport?.addEventListener("scroll", update);

    return () => {
      window.removeEventListener("resize", update);
      viewport?.removeEventListener("resize", update);
      viewport?.removeEventListener("scroll", update);

      for (const property of Object.values(properties)) {
        root.style.removeProperty(property);
      }
    };
  }, []);
}

function useSearchQuery() {
  const [query, setQuery] = useState("");
  const list = useRef<HTMLDivElement>(null);
  const onQueryChange = useCallback((next: string) => {
    setQuery(next);

    list.current?.scrollTo({ top: 0 });
  }, []);

  return { list, onQueryChange, query, setQuery };
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
  const modifier = useShortcutModifier();

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
        <Kbd glyph={modifier === "⌘"}>{modifier}</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
    </button>
  );
}

export function DocsSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { list, onQueryChange, query, setQuery } = useSearchQuery();
  const { records, load, status } = useSearchIndex();
  const input = useRef<HTMLInputElement>(null);

  useSearchViewport();

  const grouped = useMemo(() => results(records, query), [query, records]);

  const openSearch = useCallback(() => {
    load();
    setOpen(true);
  }, [load]);

  const onOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);

      if (next) {
        load();
      } else {
        setQuery("");
      }
    },
    [load, setQuery]
  );

  useCommandKey(useCallback(() => onOpenChange(!open), [onOpenChange, open]));

  const go = useCallback(
    (url: string) => {
      setOpen(false);
      setQuery("");
      router.push(url);
    },
    [router, setQuery]
  );

  return (
    <>
      <Trigger className={className} onIntent={load} onOpen={openSearch} />

      <CommandDialog
        className="site-search-dialog translate-x-0 translate-y-0 sm:-translate-x-1/2 sm:-translate-y-1/2"
        description="Search components and documentation."
        initialFocus={input}
        onOpenChange={onOpenChange}
        open={open}
        title="Search the registry"
      >
        <Command label="Search the registry" shouldFilter={false}>
          <CommandInput
            onValueChange={onQueryChange}
            placeholder="Search the registry"
            ref={input}
            value={query}
          />
          <CommandList
            className="min-h-0 flex-1 max-h-none sm:h-80 sm:flex-none sm:max-h-80 [&>[cmdk-list-sizer]]:flex [&>[cmdk-list-sizer]]:min-h-full [&>[cmdk-list-sizer]]:flex-col"
            ref={list}
          >
            <SearchFeedback
              empty={grouped.length === 0}
              onRetry={load}
              status={status}
            />
            {grouped.map(([group, rows]) => (
              <CommandGroup heading={group} key={group}>
                {rows.map((record) => (
                  <Result key={record.url} onSelect={go} record={record} />
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

function SearchFeedback({
  empty,
  onRetry,
  status,
}: {
  empty: boolean;
  onRetry: () => void;
  status: SearchStatus;
}) {
  if (status === "idle" || status === "loading") {
    return <Placeholder />;
  }
  if (status === "error") {
    return (
      <div className="grid gap-3 p-4">
        <p className="text-muted-foreground text-sm" role="status">
          Search could not load. Try again.
        </p>
        <CommandItem onSelect={onRetry} value="retry-search">
          Retry search
        </CommandItem>
      </div>
    );
  }
  return empty ? (
    <CommandEmpty className="flex flex-1 items-center justify-center py-0">
      Nothing matches that.
    </CommandEmpty>
  ) : null;
}

const PLACEHOLDER_ROWS = [40, 28, 34, 24, 44, 30, 36, 26];

function Placeholder() {
  return (
    <div aria-hidden="true" className="p-1">
      {PLACEHOLDER_ROWS.map((width) => (
        <div className="flex h-9 items-center px-2" key={width}>
          <Skeleton
            className="h-3 w-(--width)"
            style={{ "--width": `${width}%` } as CSSProperties}
          />
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
