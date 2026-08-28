import Link from "next/link";

/**
 * The mark, drawn rather than fetched.
 *
 * The same two paths are in `assets/registry-logo.svg`, which exists because
 * shadcn's directory listing takes the SVG's literal bytes pasted into a JSON
 * field. That file is data; this is the header. Change the mark and change
 * both, or the site and the listing stop being the same logo.
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.45 5.9L18.23 16L6.45 26.1L3 22.07L10.09 16L3 9.93Z" />
      <path d="M18.4 20.24L29 20.24L29 24.48L18.4 24.48Z" />
    </svg>
  );
}

/** The way back to the gallery, and the only branding a header carries. */
export function DocsWordmark() {
  return (
    <Link
      className="flex shrink-0 items-center gap-2.5 text-phosphor outline-none transition-colors hover:text-phosphor-bright focus-visible:text-phosphor-bright"
      href="/"
    >
      <Mark className="size-[1.1rem]" />
      <strong className="font-bold font-mono text-sm tracking-[0.16em]">
        AFTERGLOW
      </strong>
    </Link>
  );
}
