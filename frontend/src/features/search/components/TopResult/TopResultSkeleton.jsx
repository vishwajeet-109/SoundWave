import { Skeleton } from "@/shared/ui";

export default function TopResultSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

      <Skeleton className="aspect-square w-full" />

      <div className="space-y-4 p-6">

        <Skeleton className="h-6 w-20 rounded-full" />

        <Skeleton className="h-10 w-3/4" />

        <Skeleton className="h-4 w-1/2" />

        <Skeleton className="h-4 w-32" />

      </div>

    </div>
  );
}