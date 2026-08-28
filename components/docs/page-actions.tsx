"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  FileTextIcon,
} from "lucide-react";
import { useCallback } from "react";

import { useCopied } from "@/components/docs/use-copied";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/terminal/ui/dropdown-menu";

/**
 * Where the assistants take a question in a query string. Data rather than
 * markup, so a fourth one is a line here instead of another block below.
 */
const ASSISTANTS = [
  { label: "Open in ChatGPT", url: "https://chatgpt.com/?q=" },
  { label: "Open in Claude", url: "https://claude.ai/new?q=" },
];

/**
 * The page, for whoever is not reading it.
 *
 * Copy fetches `/c/<name>.md` rather than carrying the markdown in the bundle.
 * The source of a component runs to several kilobytes, and shipping that to
 * every visitor so a few of them can press a button is the wrong trade. It also
 * means the button can only hand over what the route serves, so the two cannot
 * drift.
 *
 * The assistant links pass the URL, not the text. The model fetches it, which
 * is what the markdown route is for, and a page's worth of source in a query
 * string is past what a browser will carry anyway.
 */
export function PageActions({ name, url }: { name: string; url: string }) {
  const markdown = `${url}/c/${name}.md`;

  const read = useCallback(
    () => fetch(`/c/${name}.md`).then((response) => response.text()),
    [name]
  );
  const { copied, copy } = useCopied(read);

  const question = encodeURIComponent(
    `I am looking at ${markdown}, one component from the afterglow shadcn registry. Read it and help me use the component.`
  );

  return (
    <div className="flex shrink-0 items-center border border-line">
      <button
        className="flex items-center gap-2 px-2.5 py-1.5 font-mono text-[0.5625rem] text-muted-foreground uppercase tracking-[0.1em] outline-none transition-colors hover:text-phosphor focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-phosphor-bright"
        onClick={copy}
        type="button"
      >
        {copied ? (
          <CheckIcon className="size-3 text-phosphor" />
        ) : (
          <CopyIcon className="size-3" />
        )}
        {copied ? "Copied" : "Copy page"}
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="More ways to read this page"
          className="grid h-full place-items-center border-line border-l px-1.5 py-1.5 text-phosphor-dim outline-none transition-colors hover:text-phosphor focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-phosphor-bright"
        >
          <ChevronDownIcon className="size-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={copy}>
              <CopyIcon />
              Copy markdown
            </DropdownMenuItem>
            <DropdownMenuItem render={<a href={`/c/${name}.md`} />}>
              <FileTextIcon />
              View as markdown
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {ASSISTANTS.map((assistant) => (
              <DropdownMenuItem
                key={assistant.label}
                render={
                  <a
                    href={`${assistant.url}${question}`}
                    rel="noopener"
                    target="_blank"
                  />
                }
              >
                <ExternalLinkIcon />
                {assistant.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
