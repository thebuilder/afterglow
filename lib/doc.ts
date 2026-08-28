/**
 * What an item's reference page says beyond its examples.
 *
 * Deliberately not a full prop table. Every primitive here is a thin redrawing
 * of a Base UI part, so all but a handful of its props belong to Base UI and
 * are documented there, in more detail and more currently than a copy here
 * would stay. What this file holds is the part of the API that is ours: which
 * parts an item exports, how they nest, the props afterglow adds on top, and
 * where to read the rest.
 *
 * `scripts/check-docs.mjs` holds it to the source. Every exported value has to
 * appear as a part, so an item that grows one fails the build rather than
 * shipping a page that quietly omits it.
 */

/** One prop afterglow adds. Base UI's own props are not restated here. */
export interface PropDoc {
  default?: string;
  name: string;
  type: string;
}

/**
 * One exported part, and what goes inside it.
 *
 * The nesting is the composition tree. Writing the tree as art instead would
 * mean maintaining a picture beside the list it describes, and the two would
 * disagree the first time a part moved.
 */
export interface PartDoc {
  name: string;
  /** What this part contains. */
  parts?: PartDoc[];
  props?: PropDoc[];
  /**
   * Optional, and left off on purpose where the name is the documentation.
   * `TableRow` does not need a sentence saying it is a row of a table, and a
   * page of those reads as filler rather than as a reference.
   */
  summary?: string;
}

/** Where the rest of an item's API is documented, by whoever owns it. */
export interface Upstream {
  href: string;
  label: string;
}

export interface ItemDoc {
  /** Anything true of the item as a whole rather than of one of its parts. */
  notes?: string[];
  /** Roots of the composition tree, in the order they should be read. */
  parts: PartDoc[];
  upstream?: Upstream[];
}

export type DocMap = Record<string, ItemDoc>;

/** Every part in the tree, depth first, which is the API reference's order. */
export function flatten(parts: PartDoc[]): PartDoc[] {
  return parts.flatMap((part) => [part, ...flatten(part.parts ?? [])]);
}

/**
 * The parts worth a section of their own.
 *
 * A part with no props and nothing to say about it is already listed, in its
 * place, in the composition tree above. Giving it a heading and a blank space
 * underneath makes the reference longer without making it say more, and a page
 * of those is what a generated API reference reads like.
 */
export function documentedParts(doc: ItemDoc): PartDoc[] {
  return flatten(doc.parts).filter(
    (part) => part.summary !== undefined || (part.props ?? []).length > 0
  );
}

/**
 * The heading the reference goes under, or nothing when there is no reference.
 *
 * An item with no parts has no API to refer to. The theme installs variables
 * and the style installs other items, and calling the two paragraphs that say
 * so an API Reference is a heading claiming more than the section under it.
 */
export function reference(
  doc: ItemDoc
): { id: string; label: string } | undefined {
  if (documentedParts(doc).length > 0) {
    return { id: "api-reference", label: "API Reference" };
  }

  if ((doc.notes ?? []).length > 0 || (doc.upstream ?? []).length > 0) {
    return { id: "notes", label: "Notes" };
  }

  return undefined;
}

/** Worth drawing a tree only when something actually goes inside something. */
export function nests(parts: PartDoc[]): boolean {
  return parts.some((part) => (part.parts ?? []).length > 0);
}

function branches(parts: PartDoc[], prefix: string): string {
  return parts
    .map((part, index) => {
      const last = index === parts.length - 1;
      const line = `${prefix}${last ? "└── " : "├── "}${part.name}`;
      const children = part.parts ?? [];

      return children.length === 0
        ? line
        : `${line}\n${branches(children, `${prefix}${last ? "    " : "│   "}`)}`;
    })
    .join("\n");
}

/**
 * The parts drawn as a tree, from the same nesting the reference is built
 * from. Roots sit at the left margin, because a branch off nothing is not a
 * tree. Each part appears once, in the place it goes, whether or not a real
 * call site would repeat it.
 */
export function compositionOf(parts: PartDoc[]): string {
  return parts
    .map((root) => {
      const children = root.parts ?? [];
      return children.length === 0
        ? root.name
        : `${root.name}\n${branches(children, "")}`;
    })
    .join("\n");
}

/** The canonical link for a Base UI component, since every one of them fits it. */
export function baseUi(component: string): Upstream {
  return {
    href: `https://base-ui.com/react/components/${component}`,
    label: `Base UI ${component.replace(/-/g, " ")}`,
  };
}
