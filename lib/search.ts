import { documentedParts } from "@/lib/doc";
import { docFor } from "@/lib/docs";
import { allItems } from "@/lib/registry";
import { sectionOf } from "@/lib/sections";
import { headingsFor } from "@/lib/toc";

/**
 * One thing the palette can take you to.
 *
 * Headings are indexed as well as items, so a search for "composition" lands on
 * the tree instead of the top of a page you then have to scan. Everything here
 * is a string the page already renders; nothing is written twice.
 */
export interface SearchRecord {
  /** The item's section, shown beside the result. */
  group: string;
  /** What the palette matches on, beyond the title. */
  keywords: string;
  parent?: string;
  title: string;
  url: string;
}

/**
 * Built at build time and served as a static file.
 *
 * `registry.json` carries the theme's several hundred variables, so importing
 * the manifest into the palette to search fifty-one titles would ship the whole
 * palette to every visitor. This is a few tens of kilobytes and is fetched the
 * first time somebody opens the dialog.
 */
export function searchIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];

  for (const item of allItems()) {
    const group = sectionOf(item)?.title ?? "Registry";
    const url = `/c/${item.name}`;
    const doc = docFor(item.name);

    records.push({
      group,
      keywords: `${item.name} ${item.description}`,
      title: item.title,
      url,
    });

    for (const heading of headingsFor(item.name)) {
      records.push({
        group,
        keywords: item.name,
        parent: item.title,
        title: heading.label,
        url: `${url}#${heading.id}`,
      });
    }

    /* The parts, so somebody who knows they want `SelectContent` and not
       `Select` is taken to the paragraph about it. */
    for (const part of doc ? documentedParts(doc) : []) {
      records.push({
        group,
        keywords: item.name,
        parent: item.title,
        title: part.name,
        url: `${url}#${part.name.toLowerCase()}`,
      });
    }
  }

  return records;
}
