import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = pathToFileURL(`${process.cwd()}/`);
const EXTENSIONS = ["", ".ts", ".tsx", "/index.ts"];

// Node does not read the `@/` alias or omitted extensions from tsconfig.
function resolveAlias(specifier) {
  const base = new URL(specifier.slice(2), ROOT);

  for (const extension of EXTENSIONS) {
    const candidate = new URL(`${base.href}${extension}`);
    if (existsSync(fileURLToPath(candidate))) {
      return candidate.href;
    }
  }

  return base.href;
}

registerHooks({
  resolve(specifier, context, next) {
    return specifier.startsWith("@/")
      ? next(resolveAlias(specifier), context)
      : next(specifier, context);
  },
});
