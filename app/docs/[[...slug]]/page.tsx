import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GuidePage } from "@/components/docs/guide-page";
import { ThemeGuidePreview } from "@/components/docs/theme-guide-preview";
import GettingStarted from "@/content/docs/getting-started.mdx";
import Installation from "@/content/docs/installation.mdx";
import Theming from "@/content/docs/theming.mdx";
import Troubleshooting from "@/content/docs/troubleshooting.mdx";
import { allGuides, findGuide } from "@/lib/guides";
import { HOMEPAGE } from "@/lib/registry";

const CONTENT = {
  "getting-started": GettingStarted,
  installation: Installation,
  theming: Theming,
  troubleshooting: Troubleshooting,
} as const;

interface Params {
  params: Promise<{ slug?: string[] }>;
}

function guideSlug(parts: string[] | undefined): string | undefined {
  if (!parts || parts.length === 0) {
    return "getting-started";
  }

  return parts.length === 1 ? parts[0] : undefined;
}

export function generateStaticParams() {
  return allGuides().map((guide) => ({
    slug: guide.slug === "getting-started" ? [] : [guide.slug],
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const name = guideSlug(slug);
  const guide = name ? findGuide(name) : undefined;

  if (!guide) {
    return {};
  }

  const url = `${HOMEPAGE}${guide.href}`;
  const socialTitle = `${guide.title}, Afterglow`;

  return {
    alternates: { canonical: url },
    description: guide.description,
    openGraph: {
      description: guide.description,
      siteName: "Afterglow",
      title: socialTitle,
      type: "article",
      url,
    },
    title: guide.title,
    twitter: {
      card: "summary_large_image",
      description: guide.description,
      title: socialTitle,
    },
  };
}

export default async function GuideRoute({ params }: Params) {
  const { slug } = await params;
  const name = guideSlug(slug);
  const guide = name ? findGuide(name) : undefined;
  const Content = name ? CONTENT[name as keyof typeof CONTENT] : undefined;

  if (!(guide && Content)) {
    notFound();
  }

  return (
    <GuidePage guide={guide}>
      {name === "theming" ? <ThemeGuidePreview /> : null}
      <Content />
    </GuidePage>
  );
}
