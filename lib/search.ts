import { documentedParts } from "@/lib/doc";
import { docFor } from "@/lib/docs";
import { allGuides } from "@/lib/guides";
import { sectionsWithItems } from "@/lib/sections";
import { headingsFor } from "@/lib/toc";

export interface SearchRecord {
  description?: string;
  group: string;
  name?: string;
  parent?: string;
  shared?: true;
  title: string;
  url: string;
}

export function searchIndex(): SearchRecord[] {
  const records: SearchRecord[] = allGuides().flatMap((guide) => [
    {
      description: guide.description,
      group: "Start",
      title: guide.title,
      url: guide.href,
    },
    ...guide.toc.map((heading) => ({
      group: "Start",
      parent: guide.title,
      title: heading.label,
      url: `${guide.href}#${heading.id}`,
    })),
  ]);

  for (const section of sectionsWithItems()) {
    for (const item of section.items) {
      const url = `/c/${item.name}`;
      const doc = docFor(item.name);

      records.push({
        description: item.description,
        group: section.title,
        name: item.name,
        title: item.title,
        url,
      });

      for (const heading of headingsFor(item.name)) {
        records.push({
          group: section.title,
          parent: item.title,
          title: heading.label,
          url: `${url}#${heading.id}`,
        });
      }

      for (const part of doc ? documentedParts(doc) : []) {
        records.push({
          group: section.title,
          parent: item.title,
          title: part.name,
          url: `${url}#${part.name.toLowerCase()}`,
        });
      }
    }
  }

  return markShared(records);
}

function markShared(records: SearchRecord[]): SearchRecord[] {
  const parents = new Map<string, Set<string>>();

  for (const record of records) {
    if (!record.parent) {
      continue;
    }
    const seen = parents.get(record.title) ?? new Set<string>();
    seen.add(record.parent);
    parents.set(record.title, seen);
  }

  for (const record of records) {
    if (record.parent && (parents.get(record.title)?.size ?? 0) > 1) {
      record.shared = true;
    }
  }

  return records;
}
