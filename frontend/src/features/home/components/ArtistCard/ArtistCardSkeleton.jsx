import { Skeleton } from "@/shared/ui";

export default function ArtistCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-zinc-800 bg-[#171717]">

      <div className="flex justify-center pt-8">

        <Skeleton className="h-40 w-40 rounded-full" />

      </div>

      <div className="space-y-3 p-6">

        <Skeleton className="mx-auto h-6 w-36" />

        <Skeleton className="mx-auto h-4 w-28" />

        <Skeleton className="mx-auto h-4 w-20" />

        <Skeleton className="mx-auto h-7 w-20 rounded-full" />

      </div>

    </div>
  );
}