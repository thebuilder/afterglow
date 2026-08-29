import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

import OperatorDashboardPage from "@/registry/terminal/blocks/operator-dashboard/page";

export default function Page() {
  return (
    <>
      <OperatorDashboardPage />
      <Link
        className="fixed bottom-4 left-4 z-200 inline-flex items-center gap-2 border border-line bg-void/90 px-3 py-2 font-mono font-bold text-2xs text-phosphor uppercase tracking-terminal-lg outline-none backdrop-blur-md transition-colors hover:border-line-strong hover:text-phosphor-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phosphor-bright"
        href="/"
      >
        <ChevronLeftIcon className="size-3.5" />
        Registry
      </Link>
    </>
  );
}
