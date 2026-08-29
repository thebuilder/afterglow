"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/terminal/ui/chart";

const CHANNELS = [
  { channel: "COM", inbound: 31, outbound: 18 },
  { channel: "NAV", inbound: 19, outbound: 27 },
  { channel: "SYS", inbound: 42, outbound: 14 },
  { channel: "AUX", inbound: 24, outbound: 22 },
  { channel: "SEC", inbound: 36, outbound: 29 },
];

const CONFIG = {
  inbound: { color: "var(--chart-1)", label: "Inbound" },
  outbound: { color: "var(--chart-2)", label: "Outbound" },
} satisfies ChartConfig;

export function ChartChannelLoad() {
  return (
    <div className="w-full border border-line bg-panel p-4">
      <div className="mb-4">
        <p className="font-heading text-phosphor-bright text-sm uppercase tracking-terminal-lg">
          Channel load
        </p>
        <p className="mt-1 text-muted-foreground text-xs">
          Messages per minute
        </p>
      </div>
      <ChartContainer className="max-h-72 min-h-52 w-full" config={CONFIG}>
        <BarChart accessibilityLayer data={CHANNELS}>
          <CartesianGrid strokeDasharray="2 4" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="channel"
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tickLine={false} width={36} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="inbound"
            fill="var(--color-inbound)"
            isAnimationActive={false}
            radius={0}
          />
          <Bar
            dataKey="outbound"
            fill="var(--color-outbound)"
            isAnimationActive={false}
            radius={0}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
