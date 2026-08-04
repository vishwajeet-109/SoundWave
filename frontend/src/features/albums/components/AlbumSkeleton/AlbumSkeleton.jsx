import { Skeleton } from "@/shared/ui";

export default function AlbumSkeleton() {
  return (
    <div className="space-y-10">
      {/* Hero skeleton */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end">
        <Skeleton className="aspect-square w-full max-w-[240px] rounded-2xl sm:w-60" />

        <div className="flex flex-1 flex-col gap-4">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-10 w-3/4 rounded-lg" />
          <Skeleton className="h-10 w-1/2 rounded-lg sm:h-12" />

          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-full" />
          </div>
        </div>
      </div>

      {/* Actions skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-14 w-14 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* Track list skeleton */}
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-xl px-4 py-3"
          >
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-4 flex-1 rounded-full" />
            <Skeleton className="h-4 w-10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
