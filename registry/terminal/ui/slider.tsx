"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

/**
 * A fader: a hairline track, a lit range, and a square handle with a glow.
 *
 * The thumb is a rectangle across the track rather than a circle on it, which
 * is what a physical fader looks like from above and what keeps the one moving
 * part in the same vocabulary as everything else. It turns with the track, so
 * a vertical fader gets a wide handle rather than a two pixel sliver.
 */
/**
 * How many thumbs to draw.
 *
 * Only the count matters here, so it is counted rather than mapped over a value
 * that may not be an array: Base UI accepts a bare number for a single-thumb
 * slider, and treating that as the value list is what makes `.map` blow up.
 * With nothing given at all it is a range, which is what two handles means.
 */
function thumbCount(
  value: SliderPrimitive.Root.Props["value"],
  defaultValue: SliderPrimitive.Root.Props["defaultValue"]
): number {
  if (Array.isArray(value)) {
    return value.length;
  }
  if (Array.isArray(defaultValue)) {
    return defaultValue.length;
  }
  if (typeof value === "number" || typeof defaultValue === "number") {
    return 1;
  }
  return 2;
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderPrimitive.Root.Props) {
  const thumbs = thumbCount(value, defaultValue);

  return (
    <SliderPrimitive.Root
      className={cn(
        "data-disabled:opacity-40 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
        className
      )}
      data-slot="slider"
      defaultValue={defaultValue}
      max={max}
      min={min}
      thumbAlignment="edge"
      value={value}
      {...props}
    >
      {/*
       * The `before` box is the touch target. A hairline track is the drawing,
       * not the thing you are meant to hit, so an invisible band reaches out
       * to a finger's width either side of it. It is a pseudo-element rather
       * than padding because a press on it still resolves to the control,
       * while the control's own box, which is what Base UI measures a press
       * against, keeps the size it draws at.
       */}
      <SliderPrimitive.Control className="relative flex touch-none select-none items-center before:absolute before:content-[''] data-[orientation=horizontal]:before:inset-x-0 data-[orientation=horizontal]:before:-inset-y-5 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:flex-col data-[orientation=vertical]:before:inset-y-0 data-[orientation=vertical]:before:-inset-x-5">
        <SliderPrimitive.Track
          className="relative grow overflow-hidden rounded-none bg-phosphor/10 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1"
          data-slot="slider-track"
        >
          <SliderPrimitive.Indicator
            className="absolute bg-phosphor shadow-[0_0_10px_rgb(134_250_221/0.45)] data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
            data-slot="slider-range"
          />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbs }, (_, index) => (
          <SliderPrimitive.Thumb
            // The `before` box is the handle's own target, wide enough that a
            // press near a fader grabs it instead of jumping the value to the
            // finger, and wide enough to tell two handles of a range apart.
            className="block shrink-0 rounded-none border border-phosphor bg-void shadow-[0_0_10px_rgb(134_250_221/0.35)] outline-none transition-[box-shadow] before:absolute before:-inset-3.5 before:content-[''] hover:shadow-[0_0_14px_rgb(134_250_221/0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright data-[orientation=horizontal]:h-4 data-[orientation=horizontal]:w-2 data-[orientation=vertical]:h-2 data-[orientation=vertical]:w-4"
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
