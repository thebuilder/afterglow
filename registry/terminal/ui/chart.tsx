"use client";

import {
  type ComponentProps,
  type ComponentType,
  type CSSProperties,
  createContext,
  type ReactNode,
  useContext,
  useId,
  useMemo,
} from "react";
import {
  type DefaultLegendContentProps,
  type DefaultTooltipContentProps,
  Legend,
  ResponsiveContainer,
  Tooltip,
  type TooltipPayloadEntry,
  type TooltipValueType,
} from "recharts";

import { cn } from "@/lib/utils";

const THEMES = { dark: ".dark", light: "" } as const;
const INITIAL_DIMENSION = { height: 200, width: 320 } as const;

type TooltipNameType = number | string;

export type ChartConfig = Record<
  string,
  {
    icon?: ComponentType;
    label?: ReactNode;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
>;

interface ChartContextProps {
  config: ChartConfig;
}

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

function ChartContainer({
  id,
  className,
  children,
  config,
  initialDimension = INITIAL_DIMENSION,
  ...props
}: ComponentProps<"div"> & {
  children: ComponentProps<typeof ResponsiveContainer>["children"];
  config: ChartConfig;
  initialDimension?: { height: number; width: number };
}) {
  const uniqueId = useId();
  const chartId = `chart-${id ?? uniqueId.replaceAll(":", "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn(
          "flex aspect-video justify-center overflow-hidden font-mono text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/60 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-line-strong [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border/60 [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted/80 [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
          className
        )}
        data-chart={chartId}
        data-slot="chart"
        {...props}
      >
        <ChartStyle config={config} id={chartId} />
        <div className="size-full animate-chart-in">
          <ResponsiveContainer initialDimension={initialDimension}>
            {children}
          </ResponsiveContainer>
        </div>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { config: ChartConfig; id: string }) {
  const colorConfig = Object.entries(config).filter(
    ([, itemConfig]) => itemConfig.theme ?? itemConfig.color
  );

  if (colorConfig.length === 0) {
    return null;
  }

  return (
    <style>
      {Object.entries(THEMES)
        .map(([theme, prefix]) => {
          const variables = colorConfig
            .map(([key, itemConfig]) => {
              const color =
                itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
                itemConfig.color;
              return color ? `--color-${key}: ${color};` : "";
            })
            .join("");

          return `${prefix} [data-chart="${id}"] { ${variables} }`;
        })
        .join("\n")}
    </style>
  );
}

const ChartTooltip = Tooltip;

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: ComponentProps<typeof Tooltip> &
  ComponentProps<"div"> & {
    hideIndicator?: boolean;
    hideLabel?: boolean;
    indicator?: "dashed" | "dot" | "line";
    labelKey?: string;
    nameKey?: string;
  } & Omit<
    DefaultTooltipContentProps<TooltipValueType, TooltipNameType>,
    "accessibilityLayer"
  >) {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium text-phosphor-bright", labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    return value ? (
      <div className={cn("font-medium text-phosphor-bright", labelClassName)}>
        {value}
      </div>
    ) : null;
  }, [
    config,
    hideLabel,
    label,
    labelClassName,
    labelFormatter,
    labelKey,
    payload,
  ]);

  if (!(active && payload?.length)) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "grid min-w-32 items-start gap-1.5 border border-line-strong bg-popover px-2.5 py-1.5 text-xs shadow-panel",
        className
      )}
    >
      {nestLabel ? null : <div className="contents">{tooltipLabel}</div>}
      <div className="grid gap-1.5">
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey ?? item.name ?? item.dataKey ?? "value"}`;

            return (
              <ChartTooltipItem
                color={color}
                config={config}
                formatter={formatter}
                hideIndicator={hideIndicator}
                index={index}
                indicator={indicator}
                item={item}
                key={key}
                nestLabel={nestLabel}
                payload={payload}
                tooltipLabel={tooltipLabel}
              />
            );
          })}
      </div>
    </div>
  );
}

interface ChartTooltipItemProps {
  color?: string;
  config: ChartConfig;
  formatter: DefaultTooltipContentProps<
    TooltipValueType,
    TooltipNameType
  >["formatter"];
  hideIndicator: boolean;
  index: number;
  indicator: "dashed" | "dot" | "line";
  item: TooltipPayloadEntry<TooltipValueType, TooltipNameType>;
  nestLabel: boolean;
  payload: readonly TooltipPayloadEntry<TooltipValueType, TooltipNameType>[];
  tooltipLabel: ReactNode;
}

function ChartTooltipItem({
  color,
  config,
  formatter,
  hideIndicator,
  index,
  indicator,
  item,
  nestLabel,
  payload,
  tooltipLabel,
}: ChartTooltipItemProps) {
  const key = `${item.name ?? item.dataKey ?? "value"}`;
  const itemConfig = getPayloadConfigFromPayload(config, item, key);
  const indicatorColor = color ?? item.payload?.fill ?? item.color;
  const Icon = itemConfig?.icon;
  const formattedItem = getFormattedTooltipItem({
    formatter,
    index,
    item,
    payload,
  });

  if (formattedItem) {
    return formattedItem;
  }

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5 [&>svg]:text-muted-foreground",
        indicator === "dot" && "items-center"
      )}
    >
      <ChartTooltipMarker
        color={indicatorColor}
        hidden={hideIndicator}
        Icon={Icon}
        indicator={indicator}
        nested={nestLabel}
      />
      <div
        className={cn(
          "flex flex-1 justify-between gap-4 leading-none",
          nestLabel ? "items-end" : "items-center"
        )}
      >
        <div className="grid gap-1.5">
          {nestLabel ? <div className="contents">{tooltipLabel}</div> : null}
          <span className="text-muted-foreground">
            {itemConfig?.label ?? item.name}
          </span>
        </div>
        <ChartTooltipValue value={item.value} />
      </div>
    </div>
  );
}

function getFormattedTooltipItem({
  formatter,
  index,
  item,
  payload,
}: Pick<ChartTooltipItemProps, "formatter" | "index" | "item" | "payload">) {
  if (!(formatter && item.value !== undefined && item.name !== undefined)) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap items-stretch gap-2">
      {formatter(item.value, item.name, item, index, payload)}
    </div>
  );
}

function ChartTooltipMarker({
  color,
  hidden,
  Icon,
  indicator,
  nested,
}: {
  color: string | undefined;
  hidden: boolean;
  Icon: ChartConfig[string]["icon"];
  indicator: "dashed" | "dot" | "line";
  nested: boolean;
}) {
  if (Icon) {
    return <Icon />;
  }

  return (
    <ChartTooltipIndicator
      color={color}
      hidden={hidden}
      indicator={indicator}
      nested={nested}
    />
  );
}

function ChartTooltipValue({
  value,
}: {
  value: TooltipPayloadEntry<TooltipValueType, TooltipNameType>["value"];
}) {
  if (value === null || value === undefined) {
    return null;
  }

  return (
    <span className="font-medium text-foreground tabular-nums">
      {typeof value === "number" ? value.toLocaleString() : String(value)}
    </span>
  );
}

function ChartTooltipIndicator({
  color,
  hidden,
  indicator,
  nested,
}: {
  color: string | undefined;
  hidden: boolean;
  indicator: "dashed" | "dot" | "line";
  nested: boolean;
}) {
  if (hidden) {
    return null;
  }

  return (
    <div
      className={cn(
        "shrink-0 border-(--color-border) bg-(--color-bg)",
        indicator === "dot" && "size-2.5",
        indicator === "line" && "w-1",
        indicator === "dashed" &&
          "w-0 border-[1.5px] border-dashed bg-transparent",
        nested && indicator === "dashed" && "my-0.5"
      )}
      style={
        {
          "--color-bg": color,
          "--color-border": color,
        } as CSSProperties
      }
    />
  );
}

const ChartLegend = Legend;

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: ComponentProps<"div"> & {
  hideIcon?: boolean;
  nameKey?: string;
} & DefaultLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey ?? item.dataKey ?? "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              className="flex items-center gap-1.5 [&>svg]:size-3 [&>svg]:text-muted-foreground"
              key={key}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="size-2 shrink-0"
                  style={{ backgroundColor: item.color }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key];
}

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
};
