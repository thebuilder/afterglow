"use client";

import { useState } from "react";

import { Calendar } from "@/registry/terminal/ui/calendar";

const INITIAL_DATE = new Date(2026, 7, 29);

export function CalendarSingleDate() {
  const [date, setDate] = useState(INITIAL_DATE);

  return (
    <Calendar
      defaultMonth={date}
      mode="single"
      onSelect={setDate}
      required
      selected={date}
    />
  );
}
