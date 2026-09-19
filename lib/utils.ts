// shadcn's `utils` alias has to resolve to a file, and cn is a package now
// rather than a few lines of clsx and tailwind-merge kept here.
// biome-ignore lint/performance/noBarrelFile: the import-and-export form of this line is banned by noExportedImports.
export { cn } from "cn";
