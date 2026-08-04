import { Skeleton } from "@/shared/ui";

export default function MusicCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-square w-full rounded-2xl" />

      <Skeleton className="mt-4 h-5 w-3/4" />

      <Skeleton className="mt-2 h-4 w-1/2" />
    </div>
  );
}