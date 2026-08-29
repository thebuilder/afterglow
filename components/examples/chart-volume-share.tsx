"use client";

import { Pie, PieChart } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/terminal/ui/chart";

const VOLUME = [
  { fill: "var(--color-telemetry)", source: "telemetry", value: 48 },
  { fill: "var(--color-command)", source: "command", value: 27 },
  { fill: "var(--color-alert)", source: "alert", value: 16 },
  { fill: "var(--color-system)", source: "system", value: 9 },
];

const CONFIG = {
  alert: { color: "var(--chart-3)", label: "Alert" },
  command: { color: "var(--chart-2)", label: "Command" },
  system: { color: "var(--chart-4)", label: "System" },
  telemetry: { color: "var(--chart-1)", label: "Telemetry" },
} satisfies ChartConfig;

export function ChartVolumeShare() {
  return (
    <div className="w-full border border-line bg-panel p-4">
      <div className="mb-4">
        <p className="font-heading text-phosphor-bright text-sm uppercase tracking-terminal-lg">
          Traffic share
        </p>
        <p className="mt-1 text-muted-foreground text-xs">
          Current uplink volume
        </p>
      </div>
      <ChartContainer
        className="mx-auto max-h-72 min-h-52 w-full"
        config={CONFIG}
      >
        <PieChart accessibilityLayer>
          <ChartTooltip
            content={<ChartTooltipContent hideLabel nameKey="source" />}
          />
          <ChartLegend content={<ChartLegendContent nameKey="source" />} />
          <Pie
            data={VOLUME}
            dataKey="value"
            innerRadius="46%"
            isAnimationActive={false}
            nameKey="source"
            outerRadius="72%"
            strokeWidth={0}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
