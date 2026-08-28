import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Teaches Node the `@/` alias, so a build script can import the site's own
 * modules instead of re-deriving what they know.
 *
 * `tsconfig.json` maps `@/*` to the repository root, and every module in this
 * repository is written that way. Node resolves specifiers itself and has no
 * view of tsconfig, so without this the only ways for a script to check the
 * site's data are to parse it as text or to keep a second copy in plain JS.
 * Both are worse than twenty lines.
 *
 * The extension is added here too. TypeScript's bundler resolution lets a
 * module import `@/lib/doc`; Node wants the file it is actually in.
 */
const ROOT = pathToFileURL(`${process.cwd()}/`);
const EXTENSIONS = ["", ".ts", ".tsx", "/index.ts"];

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
