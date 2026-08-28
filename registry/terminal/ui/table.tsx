import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A manifest. Mono throughout, hairline rules, and numbers in the amber with
 * `tabular-nums`, which is the rule for anything measured rather than named:
 * sizes and counts line up under each other and stop competing with the names
 * beside them. Add `is-numeric` to a cell to get it.
 *
 * `stickyHeader` is opt-in, and only makes sense once the container has a
 * height to scroll inside, hence `containerClassName`. Sticky by default would
 * be sticky to the page: the header row detaches as the table leaves the
 * viewport and floats over whatever is below it, usually under the site's own
 * fixed chrome.
 */
function Table({
  className,
  containerClassName,
  stickyHeader = false,
  ...props
}: React.ComponentProps<"table"> & {
  containerClassName?: string;
  stickyHeader?: boolean;
}) {
  return (
    <div
      className={cn("relative w-full overflow-auto", containerClassName)}
      data-slot="table-container"
    >
      <table
        className={cn(
          "w-full caption-bottom border-collapse font-mono text-xs",
          "[&_td.is-numeric]:text-right [&_td.is-numeric]:font-normal [&_td.is-numeric]:text-amber [&_td.is-numeric]:tabular-nums",
          stickyHeader &&
            "[&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-10",
          className
        )}
        data-slot="table"
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      className={cn("[&_tr]:border-line [&_tr]:border-b", className)}
      data-slot="table-header"
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      className={cn("[&_tr:last-child]:border-0", className)}
      data-slot="table-body"
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      className={cn(
        "border-line border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      data-slot="table-footer"
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      className={cn(
        "border-line/60 border-b transition-colors hover:bg-phosphor/[0.06] data-[state=selected]:bg-phosphor/10 data-[state=selected]:shadow-[inset_2px_0_0_var(--phosphor)]",
        className
      )}
      data-slot="table-row"
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-8 whitespace-nowrap bg-panel px-2.5 text-left align-middle font-semibold text-[0.625rem] text-phosphor-bright uppercase tracking-[0.1em]",
        className
      )}
      data-slot="table-head"
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "whitespace-nowrap px-2.5 py-1.5 align-middle text-foreground/85",
        className
      )}
      data-slot="table-cell"
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      className={cn(
        "mt-3 font-semibold text-[0.625rem] text-phosphor-dim uppercase tracking-[0.1em]",
        className
      )}
      data-slot="table-caption"
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
