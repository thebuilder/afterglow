import { documentedParts } from "@/lib/doc";
import { docFor } from "@/lib/docs";
import { sectionsWithItems } from "@/lib/sections";
import { headingsFor } from "@/lib/toc";

/**
 * One thing the palette can take you to.
 *
 * Headings are indexed as well as items, so a search for "select content"
 * lands on the paragraph instead of the top of a page you then have to scan.
 * Everything here is a string the page already renders; nothing is written
 * twice.
 */
export interface SearchRecord {
  /** An item's one line, matched as a phrase rather than fuzzily. */
  description?: string;
  /** The item's section, shown beside the result. */
  group: string;
  /** An item's registry name, so the slug finds it as well as the title does. */
  name?: string;
  /** The item a heading or a part belongs to. */
  parent?: string;
  /**
   * True when another item has a heading by the same title. Fifty-one pages
   * carry an "Installation", so the title on its own says nothing about where
   * the row goes, and the palette ranks it accordingly.
   */
  shared?: true;
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

  /* Walked by section rather than by manifest order, so the palette's resting
     list and the sidebar are in the same order without sorting twice. */
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

      /* The parts, so somebody who knows they want `SelectContent` and not
         `Select` is taken to the paragraph about it. */
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

/**
 * Flag the headings more than one item has.
 *
 * Derived from the index rather than listed, because the generic headings are
 * whichever ones `headingsFor` happens to give every page, and a list here
 * would go stale the first time one of them was renamed.
 */
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
