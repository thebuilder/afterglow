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
    blurb:
      "One palette, no light mode. A phosphor tube has no daylight setting, so the light and dark blocks carry the same values and toggling a theme class does nothing.",
    id: "theme",
    title: "Theme",
    types: ["registry:theme"],
  },
  {
    blurb:
      "shadcn's components, redrawn. Same props, same slots, same accessibility work, set in mono with hairline borders and no corner radius. A stock shadcn component dropped into a project running the theme goes sharp on its own.",
    id: "primitives",
    title: "Primitives",
    types: ["registry:ui"],
  },
  {
    blurb:
      "The parts that make it a tube rather than a dark theme. The glass, the lamp, the window chrome, the log that prints itself.",
    id: "terminal",
    title: "Terminal",
    types: ["registry:component"],
  },
  {
    blurb:
      "A composed page to look at, and a style that installs the system in one go.",
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
