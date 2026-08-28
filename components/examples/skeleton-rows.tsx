import { Skeleton } from "@/registry/terminal/ui/skeleton";

export function SkeletonRows() {
  return (
    <div className="grid w-full max-w-sm gap-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8" />
        <div className="grid flex-1 gap-2">
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}
