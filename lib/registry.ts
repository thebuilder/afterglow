import registry from "@/registry.json";

export interface RegistryItem {
  categories?: string[];
  dependencies?: string[];
  description: string;
  name: string;
  registryDependencies?: string[];
  title: string;
  type: string;
}

export const HOMEPAGE = registry.homepage;
const REGISTRY_NAME = registry.name;

const NAMESPACE = `@${REGISTRY_NAME}/`;

export function isInternal(dependency: string): boolean {
  return dependency.startsWith(NAMESPACE);
}

export function internalName(dependency: string): string {
  return dependency.slice(NAMESPACE.length);
}

const items = registry.items as RegistryItem[];

export function itemsOfType(...types: string[]): RegistryItem[] {
  return items
    .filter((item) => types.includes(item.type))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function allItems(): RegistryItem[] {
  return items;
}

export function findItem(name: string): RegistryItem | undefined {
  return items.find((entry) => entry.name === name);
}

export function installArgs(item: RegistryItem): string {
  return item.type === "registry:style"
    ? `shadcn@latest init ${HOMEPAGE}/r/${item.name}.json`
    : `shadcn@latest add @${REGISTRY_NAME}/${item.name}`;
}

export const RUNNERS = [
  { command: "npx", name: "npm" },
  { command: "pnpm dlx", name: "pnpm" },
  { command: "yarn dlx", name: "yarn" },
  { command: "bunx", name: "bun" },
] as const;

export function installCommand(item: RegistryItem): string {
  return `npx ${installArgs(item)}`;
}
