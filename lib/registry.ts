import registry from "@/registry.json";

/**
 * The manifest is the site's content.
 *
 * Every card in the gallery, every install line and every count on this page is
 * read out of `registry.json`, so an item that ships is an item that is
 * documented. The alternative, a hand-kept list beside the manifest, is a
 * second source of truth that is wrong the first time somebody is in a hurry.
 */
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
export const REGISTRY_NAME = registry.name;

/**
 * The namespace, derived rather than written down. A `registryDependencies`
 * entry that points inside this registry is prefixed with it, and hardcoding
 * that prefix in the pages is what turns renaming the registry into a
 * find-and-replace across the site.
 */
const NAMESPACE = `@${REGISTRY_NAME}/`;

export function isInternal(dependency: string): boolean {
  return dependency.startsWith(NAMESPACE);
}

export function internalName(dependency: string): string {
  return dependency.slice(NAMESPACE.length);
}

const items = registry.items as RegistryItem[];

export function itemsOfType(...types: string[]): RegistryItem[] {
  return items.filter((item) => types.includes(item.type));
}

export function allItems(): RegistryItem[] {
  return items;
}

export function findItem(name: string): RegistryItem | undefined {
  return items.find((entry) => entry.name === name);
}

/**
 * The namespaced form, which is the one worth teaching. It needs one line in a
 * consumer's `components.json` and then reads like an import rather than a URL,
 * and it is what makes `registryDependencies` inside this registry resolve.
 *
 * A style is the exception. It is a starting point rather than an addition, so
 * it goes to `init`, which builds the project around it; `add` would try to
 * drop a whole design system into one that already exists.
 */
export function installCommand(item: RegistryItem): string {
  return item.type === "registry:style"
    ? `npx shadcn@latest init ${HOMEPAGE}/r/${item.name}.json`
    : `npx shadcn@latest add @${REGISTRY_NAME}/${item.name}`;
}
