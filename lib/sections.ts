import { itemsOfType, type RegistryItem } from "@/lib/registry";

/**
 * How the registry is cut up for a reader.
 *
 * The manifest knows an item's `type` and nothing about which heading it
 * belongs under, and the four groups here are not one-to-one with the types:
 * a block and a style are both "the whole thing" to somebody deciding what to
 * install. Kept in one place because the gallery, the sidebar and `llms.txt`
 * all have to agree, and three copies of this list is three chances to disagree.
 */
export interface Section {
  blurb: string;
  id: string;
  title: string;
  types: string[];
}

const SECTIONS: Section[] = [
  {
    blurb: "One dark palette, shared by every component.",
    id: "theme",
    title: "Theme",
    types: ["registry:theme"],
  },
  {
    blurb:
      "shadcn primitives, redrawn for Afterglow. Monospace type, hairline borders, square corners and stepped motion.",
    id: "primitives",
    title: "Primitives",
    types: ["registry:ui"],
  },
  {
    blurb:
      "CRT-specific components for scanlines, screens, status lights, prompts, boot logs and window chrome.",
    id: "terminal",
    title: "Terminal",
    types: ["registry:component"],
  },
  {
    blurb:
      "A complete registry preset and an operator console composed from the same parts.",
    id: "whole",
    title: "The whole thing",
    types: ["registry:block", "registry:style"],
  },
];

export interface SectionWithItems extends Section {
  items: RegistryItem[];
}

/** The same four groups, each carrying the items that fall into it. */
export function sectionsWithItems(): SectionWithItems[] {
  return SECTIONS.map((section) => ({
    ...section,
    items: itemsOfType(...section.types),
  }));
}

/**
 * The nav, flattened to what a link needs.
 *
 * `registry.json` carries the theme's several hundred CSS variables, so
 * importing it into a client component to read two strings ships the whole
 * palette twice. The server builds this and passes it down instead.
 */
export interface NavItem {
  name: string;
  title: string;
}

export interface NavSection {
  id: string;
  items: NavItem[];
  title: string;
}

export function navSections(): NavSection[] {
  return sectionsWithItems().map(({ id, title, items }) => ({
    id,
    items: items.map((item) => ({ name: item.name, title: item.title })),
    title,
  }));
}

/**
 * Where "Docs" goes. The first row of the sidebar, so the link and the list
 * cannot disagree about where reading starts. That is the theme, which is also
 * the item you have to install first.
 */
export function docsEntry(): string {
  const [first] = itemsOfType(...SECTIONS[0].types);
  return `/c/${first.name}`;
}
