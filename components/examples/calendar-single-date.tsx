"use client";

import { useState } from "react";

import { Calendar } from "@/registry/terminal/ui/calendar";

const INITIAL_DATE = new Date(2026, 7, 29);
const START_MONTH = new Date(1900, 0);
const END_MONTH = new Date(2100, 11);

export function CalendarSingleDate() {
  const [date, setDate] = useState(INITIAL_DATE);

  return (
    <Calendar
      captionLayout="dropdown"
      defaultMonth={date}
      endMonth={END_MONTH}
      mode="single"
      onSelect={setDate}
      required
      selected={date}
      startMonth={START_MONTH}
    />
  );
}
