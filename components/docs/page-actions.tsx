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
import { HOMEPAGE } from "@/lib/registry";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/terminal/ui/dropdown-menu";

const ASSISTANTS = [
  { label: "Open in ChatGPT", url: "https://chatgpt.com/?q=" },
  { label: "Open in Claude", url: "https://claude.ai/new?q=" },
];

export function PageActions({
  markdownPath,
  prompt,
}: {
  markdownPath: string;
  prompt: string;
}) {
  const markdown = `${HOMEPAGE}${markdownPath}`;

  const read = useCallback(
    () => fetch(markdownPath).then((response) => response.text()),
    [markdownPath]
  );
  const { copied, copy } = useCopied(read);

  const question = encodeURIComponent(`I am looking at ${markdown}. ${prompt}`);

  return (
    <div className="flex shrink-0 items-center border border-line">
      <button
        className="flex items-center gap-2 px-2.5 py-1.5 font-mono text-3xs text-muted-foreground uppercase tracking-terminal outline-none transition-colors hover:text-phosphor focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-phosphor-bright"
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
          className="grid h-full place-items-center border-line border-l px-1.5 py-1.5 text-phosphor-dim outline-none transition-colors hover:text-phosphor focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-phosphor-bright"
        >
          <ChevronDownIcon className="size-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={copy}>
              <CopyIcon />
              Copy markdown
            </DropdownMenuItem>
            <DropdownMenuItem render={<a href={markdownPath} />}>
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
