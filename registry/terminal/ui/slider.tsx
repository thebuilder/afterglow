"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

/**
 * A fader: a hairline track, a lit range, and a square handle with a glow.
 *
 * The thumb is a rectangle taller than the track rather than a circle on it,
 * which is what a physical fader looks like from above and what keeps the one
 * moving part in the same vocabulary as everything else.
 */
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];

  return (
    <SliderPrimitive.Root
      className={cn(
        "data-disabled:opacity-40 data-horizontal:w-full data-vertical:h-full",
        className,
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      thumbAlignment="edge"
      value={value}
      {...props}
    >
      <SliderPrimitive.Control className="flex touch-none select-none items-center data-vertical:h-full data-vertical:min-h-44 data-vertical:flex-col">
        <SliderPrimitive.Track
          className="relative grow overflow-hidden rounded-none bg-phosphor/10 data-horizontal:h-1 data-horizontal:w-full data-vertical:h-full data-vertical:w-1"
          data-slot="slider-track"
        >
          <SliderPrimitive.Indicator
            className="absolute bg-phosphor shadow-[0_0_10px_rgb(134_250_221/0.45)]"
            data-slot="slider-range"
          />
        </SliderPrimitive.Track>
        {values.map((_, index) => (
          <SliderPrimitive.Thumb
            className="block h-4 w-2 shrink-0 rounded-none border border-phosphor bg-void shadow-[0_0_10px_rgb(134_250_221/0.35)] outline-none transition-[box-shadow] hover:shadow-[0_0_14px_rgb(134_250_221/0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright"
            data-slot="slider-thumb"
            // biome-ignore lint/suspicious/noArrayIndexKey: a slider identifies thumbs by position, and its values are not stable ids.
            key={index}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
