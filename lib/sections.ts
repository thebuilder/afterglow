import { allGuides } from "@/lib/guides";
import { itemsOfType, type RegistryItem } from "@/lib/registry";

export interface Section {
  blurb: string;
  categories?: string[];
  id: string;
  title: string;
  types: string[];
  without?: string[];
}

const SECTIONS: Section[] = [
  {
    blurb: "One dark surface palette, with eight phosphor themes.",
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
      "CRT-specific components for status lights, prompts, boot logs and window chrome.",
    id: "terminal",
    title: "Terminal",
    types: ["registry:component"],
    without: ["effects"],
  },
  {
    blurb:
      "The glass and the things that go wrong behind it: scanlines, screens, and text that types, scrambles or breaks up.",
    categories: ["effects"],
    id: "effects",
    title: "Effects",
    types: ["registry:component"],
  },
  {
    blurb: "The checks a component has to make for itself.",
    id: "hooks",
    title: "Hooks",
    types: ["registry:hook"],
  },
  {
    blurb: "Installable compositions built from registry components.",
    id: "blocks",
    title: "Blocks",
    types: ["registry:block"],
  },
  {
    blurb: "Start a project with the theme and every component installed.",
    id: "presets",
    title: "Presets",
    types: ["registry:style"],
  },
];

export interface SectionWithItems extends Section {
  items: RegistryItem[];
}

function inSection(item: RegistryItem, section: Section): boolean {
  const categories = item.categories ?? [];

  if (section.categories) {
    return section.categories.some((name) => categories.includes(name));
  }

  return !section.without?.some((name) => categories.includes(name));
}

export function sectionsWithItems(): SectionWithItems[] {
  return SECTIONS.map((section) => ({
    ...section,
    items: itemsOfType(...section.types).filter((item) =>
      inSection(item, section)
    ),
  }));
}

export interface NavItem {
  href: string;
  title: string;
}

export interface NavSection {
  id: string;
  items: NavItem[];
  title: string;
}

export function navSections(): NavSection[] {
  return [
    {
      id: "start",
      items: [
        ...allGuides().map((guide) => ({
          href: guide.href,
          title: guide.navTitle,
        })),
        { href: "/components", title: "Components" },
        { href: "/typeset", title: "Typeset" },
      ],
      title: "Start",
    },
    ...sectionsWithItems()
      .map(({ id, title, items }) => ({
        id,
        items: items
          .filter((item) => item.name !== "theme")
          .map((item) => ({
            href: `/c/${item.name}`,
            title: item.title,
          })),
        title,
      }))
      .filter((section) => section.items.length > 0),
  ];
}

export function docsEntry(): string {
  return "/docs";
}

export function itemCount(total: number): string {
  return `${total} ${total === 1 ? "item" : "items"}`;
}
