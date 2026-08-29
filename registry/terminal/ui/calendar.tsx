"use client";

import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { type ComponentProps, useEffect, useRef } from "react";
import {
  type CustomComponents,
  type DayButton,
  DayPicker,
  getDefaultClassNames,
  type Locale,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/registry/terminal/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  fixedWeeks = true,
  captionLayout = "label",
  navLayout = captionLayout === "label" ? undefined : "around",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: ComponentProps<typeof DayPicker> & {
  buttonVariant?: ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      captionLayout={captionLayout}
      className={cn(
        "group/calendar w-fit bg-popover p-3 font-mono text-xs [--cell-size:--spacing(8)]",
        className
      )}
      classNames={{
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "pointer-events-auto absolute top-0 right-0 size-(--cell-size) p-0 select-none aria-disabled:opacity-40",
          defaultClassNames.button_next
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "pointer-events-auto absolute top-0 left-0 size-(--cell-size) p-0 select-none aria-disabled:opacity-40",
          defaultClassNames.button_previous
        ),
        caption_label: cn(
          "font-bold text-phosphor-bright uppercase tracking-terminal-lg select-none",
          captionLayout === "label"
            ? "text-xs"
            : "flex h-8 items-center gap-1 px-2 text-xs [&>svg]:size-3.5 [&>svg]:text-phosphor-dim",
          defaultClassNames.caption_label
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none",
          defaultClassNames.day
        ),
        disabled: cn(
          "text-muted-foreground opacity-35",
          defaultClassNames.disabled
        ),
        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown
        ),
        dropdown_root: cn(
          "relative border border-line has-focus:border-line-strong",
          defaultClassNames.dropdown_root
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 font-bold text-phosphor-bright text-xs uppercase tracking-terminal-lg",
          defaultClassNames.dropdowns
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        nav: cn(
          "pointer-events-none absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        outside: cn(
          "text-muted-foreground/45 aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        range_end: cn("bg-accent", defaultClassNames.range_end),
        range_middle: cn("bg-accent/60", defaultClassNames.range_middle),
        range_start: cn("bg-accent", defaultClassNames.range_start),
        root: cn("w-fit", defaultClassNames.root),
        today: cn(
          "outline outline-1 outline-warning/70 data-[selected=true]:outline-none",
          defaultClassNames.today
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        week_number: cn(
          "text-muted-foreground text-xs select-none",
          defaultClassNames.week_number
        ),
        week_number_header: cn(
          "w-(--cell-size) select-none",
          defaultClassNames.week_number_header
        ),
        weekday: cn(
          "flex-1 font-normal text-3xs text-phosphor-dim uppercase tracking-terminal select-none",
          defaultClassNames.weekday
        ),
        weekdays: cn("flex", defaultClassNames.weekdays),
        ...classNames,
      }}
      components={{ ...CALENDAR_COMPONENTS, ...components }}
      fixedWeeks={fixedWeeks}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      locale={locale}
      navLayout={navLayout}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  return (
    <Button
      className={cn(
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 border border-transparent font-normal text-foreground/80 leading-none hover:translate-y-0 hover:border-line hover:bg-accent/60 hover:shadow-none group-data-[focused=true]/day:border-phosphor-bright group-data-[outside=true]/day:text-muted-foreground/30 data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground [&>span]:text-3xs [&>span]:opacity-60",
        defaultClassNames.day,
        className
      )}
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      ref={ref}
      size="icon"
      variant="ghost"
      {...props}
    />
  );
}

const CalendarRoot: CustomComponents["Root"] = ({
  className,
  rootRef,
  ...props
}) => (
  <div
    className={cn(className)}
    data-slot="calendar"
    ref={rootRef}
    {...props}
  />
);

const CalendarChevron: CustomComponents["Chevron"] = ({
  className,
  orientation,
  ...props
}) => {
  if (orientation === "left") {
    return (
      <ChevronLeftIcon
        className={cn("size-4 rtl:rotate-180", className)}
        {...props}
      />
    );
  }

  if (orientation === "right") {
    return (
      <ChevronRightIcon
        className={cn("size-4 rtl:rotate-180", className)}
        {...props}
      />
    );
  }

  return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
};

const CalendarWeekNumber: CustomComponents["WeekNumber"] = ({
  children,
  ...props
}) => (
  <td {...props}>
    <div className="flex size-(--cell-size) items-center justify-center text-center">
      {children}
    </div>
  </td>
);

const CALENDAR_COMPONENTS = {
  Chevron: CalendarChevron,
  DayButton: CalendarDayButton,
  Root: CalendarRoot,
  WeekNumber: CalendarWeekNumber,
};

export { Calendar, CalendarDayButton };
