// shadcn's `utils` alias has to resolve to a file, and cn is a package now
// rather than a few lines of clsx and tailwind-merge kept here.
// biome-ignore lint/performance/noBarrelFile: one named re-export of a leaf package.
export { cn } from "cn";
