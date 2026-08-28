import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

import ConsoleBlock from "@/registry/terminal/blocks/console/page";

/**
 * The block, mounted at the route it installs to, plus a way back.
 *
 * The block itself is rendered untouched: the page somebody reviews before
 * installing has to be the page the registry hands them, and a "back to the
 * registry" link is not something a consumer wants shipped into their app. It
 * belongs to this site, so it lives here, over the top.
 */
export default function ConsolePage() {
  return (
    <>
      <ConsoleBlock />
      <Link
        className="fixed bottom-4 left-4 z-200 inline-flex items-center gap-2 border border-line bg-void/90 px-3 py-2 font-mono font-bold text-[0.625rem] text-phosphor uppercase tracking-[0.12em] outline-none backdrop-blur-md transition-colors hover:border-line-strong hover:text-phosphor-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright"
        href="/"
      >
        <ChevronLeftIcon className="size-3.5" />
        Registry
      </Link>
    </>
  );
}
