import type { ComponentType } from "react";

/**
 * One thing a component can be shown doing.
 *
 * A registry item is rarely one picture. A button is six variants and five
 * sizes; a window is two chromes; a table is a manifest with and without a
 * header that stays put. The gallery shows the first example of each item and
 * the item's own page shows all of them, which is the only arrangement that
 * survives the registry growing past what one page can hold.
 *
 * An example is a component, because the page prints its source underneath and
 * a node has no file to print.
 */
export interface Example {
  component: ComponentType;
  description?: string;
  name: string;
}

export type ExampleMap = Record<string, Example[]>;
