import Skeleton from "@/shared/ui/skeleton";

export default function MusicCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[26px] border border-zinc-800 bg-[#171717]">

      <Skeleton className="aspect-square w-full" />

      <div className="space-y-3 p-5">

        <Skeleton className="h-5 w-3/4" />

        <Skeleton className="h-4 w-1/2" />

        <div className="flex items-center justify-between pt-2">

          <Skeleton className="h-4 w-12" />

          <Skeleton className="h-7 w-20 rounded-full" />

        </div>

      </div>

    </div>
  );
}