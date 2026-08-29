import type { DocMap, ItemDoc } from "@/lib/doc";
import { feedbackDocs } from "@/lib/docs/feedback";
import { formDocs } from "@/lib/docs/forms";
import { primitiveDocs } from "@/lib/docs/primitives";
import { structureDocs } from "@/lib/docs/structure";
import { terminalDocs } from "@/lib/docs/terminal";

const DOCS: DocMap = {
  ...terminalDocs,
  ...primitiveDocs,
  ...formDocs,
  ...feedbackDocs,
  ...structureDocs,
};

export function docFor(name: string): ItemDoc | undefined {
  return DOCS[name];
}

export function allDocs(): DocMap {
  return DOCS;
}
