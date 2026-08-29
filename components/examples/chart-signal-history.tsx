"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/terminal/ui/chart";

const READINGS = [
  { channel: 1, noise: 12, signal: 38 },
  { channel: 2, noise: 18, signal: 52 },
  { channel: 3, noise: 14, signal: 48 },
  { channel: 4, noise: 23, signal: 71 },
  { channel: 5, noise: 19, signal: 64 },
  { channel: 6, noise: 27, signal: 83 },
  { channel: 7, noise: 22, signal: 76 },
];

const CONFIG = {
  noise: { color: "var(--chart-3)", label: "Noise" },
  signal: { color: "var(--chart-1)", label: "Signal" },
} satisfies ChartConfig;

function channelTick(value: number | string) {
  return String(value).padStart(2, "0");
}

export function ChartSignalHistory() {
  return (
    <div className="w-full border border-line bg-panel p-4">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <div>
          <p className="font-heading text-phosphor-bright text-sm uppercase tracking-terminal-lg">
            Relay strength
          </p>
          <p className="mt-1 text-muted-foreground text-xs">
            Last seven channels, dB
          </p>
        </div>
        <span className="text-metric text-xl tabular-nums">76</span>
      </div>
      <ChartContainer className="max-h-72 min-h-52 w-full" config={CONFIG}>
        <LineChart
          accessibilityLayer
          data={READINGS}
          margin={{ left: 0, right: 8 }}
        >
          <CartesianGrid strokeDasharray="2 4" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="channel"
            tickFormatter={channelTick}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tickLine={false} width={44} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            dataKey="signal"
            dot={{ fill: "var(--color-signal)", r: 2 }}
            isAnimationActive={false}
            stroke="var(--color-signal)"
            strokeWidth={2}
            type="linear"
          />
          <Line
            dataKey="noise"
            dot={false}
            isAnimationActive={false}
            stroke="var(--color-noise)"
            strokeDasharray="3 3"
            strokeWidth={1}
            type="linear"
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
