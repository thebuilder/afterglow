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

function DatePicker() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  const selectDate = useCallback((nextDate: Date | undefined) => {
    setDate(nextDate);
    setOpen(false);
  }, []);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button
            className="w-64 justify-start data-[empty=true]:text-muted-foreground"
            data-empty={!date}
            variant="outline"
          />
        }
      >
        <CalendarDaysIcon />
        {date ? format(date, "PPP") : "Pick a date"}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          autoFocus
          mode="single"
          onSelect={selectDate}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
