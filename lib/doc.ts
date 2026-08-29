export interface PropDoc {
  default?: string;
  name: string;
  type: string;
}

export interface PartDoc {
  name: string;
  parts?: PartDoc[];
  props?: PropDoc[];
  summary?: string;
}

export interface Upstream {
  href: string;
  label: string;
}

export interface ItemDoc {
  notes?: string[];
  parts: PartDoc[];
  upstream?: Upstream[];
}

export type DocMap = Record<string, ItemDoc>;

export function flatten(parts: PartDoc[]): PartDoc[] {
  return parts.flatMap((part) => [part, ...flatten(part.parts ?? [])]);
}

export function documentedParts(doc: ItemDoc): PartDoc[] {
  return flatten(doc.parts).filter(
    (part) => part.summary !== undefined || (part.props ?? []).length > 0
  );
}

export function reference(
  doc: ItemDoc
): { id: string; label: string } | undefined {
  if (documentedParts(doc).length > 0) {
    return { id: "api-reference", label: "API Reference" };
  }

  if ((doc.notes ?? []).length > 0 || (doc.upstream ?? []).length > 0) {
    return { id: "notes", label: "Notes" };
  }

  return undefined;
}

export function nests(parts: PartDoc[]): boolean {
  return parts.some((part) => (part.parts ?? []).length > 0);
}

function branches(parts: PartDoc[], prefix: string): string {
  return parts
    .map((part, index) => {
      const last = index === parts.length - 1;
      const line = `${prefix}${last ? "└── " : "├── "}${part.name}`;
      const children = part.parts ?? [];

      return children.length === 0
        ? line
        : `${line}\n${branches(children, `${prefix}${last ? "    " : "│   "}`)}`;
    })
    .join("\n");
}

export function compositionOf(parts: PartDoc[]): string {
  return parts
    .map((root) => {
      const children = root.parts ?? [];
      return children.length === 0
        ? root.name
        : `${root.name}\n${branches(children, "")}`;
    })
    .join("\n");
}

export function baseUi(component: string): Upstream {
  return {
    href: `https://base-ui.com/react/components/${component}`,
    label: `Base UI ${component.replace(/-/g, " ")}`,
  };
}
