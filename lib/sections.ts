import { allGuides } from "@/lib/guides";
import { itemsOfType, type RegistryItem } from "@/lib/registry";

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
    blurb: "Full-page compositions built from registry components.",
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

export function sectionsWithItems(): SectionWithItems[] {
  return SECTIONS.map((section) => ({
    ...section,
    items: itemsOfType(...section.types),
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
      ],
      title: "Start",
    },
    ...sectionsWithItems().map(({ id, title, items }) => ({
      id,
      items: items.map((item) => ({
        href: `/c/${item.name}`,
        title: item.title,
      })),
      title,
    })),
  ];
}

export function docsEntry(): string {
  return "/docs";
}
