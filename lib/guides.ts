import { HOMEPAGE } from "@/lib/registry";

export interface Guide {
  description: string;
  href: string;
  markdownHref: string;
  navTitle: string;
  slug: string;
  source: string;
  title: string;
  toc: { id: string; label: string }[];
}

const GUIDES: Guide[] = [
  {
    description:
      "Install Afterglow as a complete terminal system or add individual components to an existing shadcn project.",
    href: "/docs",
    markdownHref: "/docs.md",
    navTitle: "Getting started",
    slug: "getting-started",
    source: "getting-started.mdx",
    title: "Getting started",
    toc: [
      { id: "quick-start", label: "Quick start" },
      { id: "install-one-component", label: "Install one component" },
      { id: "what-you-own", label: "What you own" },
      { id: "where-to-go-next", label: "Where to go next" },
    ],
  },
  {
    description:
      "Configure the Afterglow registry namespace and choose between a full-system or component-by-component installation.",
    href: "/docs/installation",
    markdownHref: "/docs/installation.md",
    navTitle: "Installation",
    slug: "installation",
    source: "installation.mdx",
    title: "Installation",
    toc: [
      { id: "before-you-start", label: "Before you start" },
      { id: "install-the-full-system", label: "Install the full system" },
      { id: "configure-the-namespace", label: "Configure the namespace" },
      { id: "add-components-by-name", label: "Add components by name" },
      { id: "direct-urls", label: "Direct URLs" },
    ],
  },
  {
    description:
      "Understand the shared palette, typography, motion, and CSS variables installed by the Afterglow theme.",
    href: "/docs/theming",
    markdownHref: "/docs/theming.md",
    navTitle: "Theming",
    slug: "theming",
    source: "theming.mdx",
    title: "Theming",
    toc: [
      { id: "install-the-theme", label: "Install the theme" },
      { id: "what-the-theme-controls", label: "What the theme controls" },
      { id: "phosphor-presets", label: "Phosphor presets" },
      { id: "change-a-token", label: "Change a token" },
      { id: "dark-by-design", label: "Dark by design" },
    ],
  },
  {
    description:
      "Fix missing styles, registry dependency errors, and the Base UI differences that matter when using Afterglow.",
    href: "/docs/troubleshooting",
    markdownHref: "/docs/troubleshooting.md",
    navTitle: "Troubleshooting",
    slug: "troubleshooting",
    source: "troubleshooting.mdx",
    title: "Troubleshooting",
    toc: [
      {
        id: "the-component-has-no-styles",
        label: "The component has no styles",
      },
      {
        id: "registry-dependencies-do-not-resolve",
        label: "Registry dependencies do not resolve",
      },
      { id: "aschild-does-not-exist", label: "asChild does not exist" },
      {
        id: "state-selectors-do-not-match",
        label: "State selectors do not match",
      },
      {
        id: "the-registry-url-returns-404",
        label: "The registry URL returns 404",
      },
    ],
  },
];

export function allGuides(): Guide[] {
  return GUIDES;
}

export function findGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function guideMarkdownUrl(guide: Guide): string {
  return `${HOMEPAGE}${guide.markdownHref}`;
}
