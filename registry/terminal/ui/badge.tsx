import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * A readout, not a pill. Nothing on a terminal is round, so the tag that says
 * what state a row is in is a bordered rectangle of tracked-out mono, sized to
 * sit on the same line as the text it annotates.
 *
 * The height is explicit and the last pixel and a half of padding is on the
 * top only. All-caps text has no descender ink, but the line box still reserves
 * the descender space, so centring the *box* leaves the letters sitting high:
 * measured here, 4.58px above the caps against 6px below. The asymmetric
 * padding pushes them back down.
 *
 * `text-box: trim-both cap alphabetic` is the property built for this and would
 * be exact rather than measured, but it only applies to a block container, and
 * the text here is an anonymous flex item so nothing reaches it. Keeping the
 * flex box is what lets an icon and a label share a gap, which is worth more
 * than the last third of a pixel.
 *
 * Pass `render` to change the element: `<Badge render={<Link href="/x" />} />`
 * makes the anchor *be* the badge rather than a link wrapped around one.
 */
const badgeVariants = cva(
  "inline-flex h-[1.125rem] w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-none border px-1.5 pt-[1.5px] font-mono font-semibold text-[0.625rem] uppercase leading-none tracking-[0.12em] transition-[color,border-color,background-color] [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    defaultVariants: { variant: "default" },
    variants: {
      variant: {
        amber: "border-amber/60 bg-amber/10 text-amber",
        azure: "border-azure/60 bg-azure/10 text-azure",
        default: "border-line-strong bg-phosphor/10 text-phosphor",
        destructive: "border-destructive bg-destructive/12 text-destructive",
        outline: "border-line text-muted-foreground",
        signal: "border-signal bg-signal/12 text-signal",
        solid: "border-phosphor bg-phosphor text-void",
        violet: "border-violet/60 bg-violet/10 text-violet",
      },
    },
  }
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      { className: cn(badgeVariants({ variant }), className) },
      props
    ),
    render,
    /* `state` is how Base UI emits data attributes on whatever element the
       render prop produced, so a link-shaped badge still carries the slot. */
    state: { slot: "badge", variant },
  });
}

export { Badge, badgeVariants };
