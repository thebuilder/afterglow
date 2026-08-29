"use client";

import { format } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/registry/terminal/ui/button";
import { Calendar } from "@/registry/terminal/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/terminal/ui/popover";

const INITIAL_DATE = new Date(2026, 7, 29);

export function CalendarDatePicker() {
  const [date, setDate] = useState(INITIAL_DATE);
  const [open, setOpen] = useState(false);

  const selectDate = useCallback((nextDate: Date) => {
    setDate(nextDate);
    setOpen(false);
  }, []);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={<Button className="w-64 justify-start" variant="outline" />}
      >
        <CalendarDaysIcon />
        {format(date, "PPP")}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          autoFocus
          defaultMonth={date}
          mode="single"
          onSelect={selectDate}
          required
          selected={date}
        />
      </PopoverContent>
    </Popover>
  );
}
