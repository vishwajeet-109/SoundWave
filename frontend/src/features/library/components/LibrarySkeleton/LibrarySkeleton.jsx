import { Skeleton } from "@/shared/ui";

export default function LibrarySkeleton() {
  return (
    <main className="space-y-12 pb-32">

      {/* ==========================================
          Hero Skeleton
      ========================================== */}

      <section
        className="
          overflow-hidden
          rounded-[36px]
          border
          border-zinc-800
          bg-[#171717]
          p-8
        "
      >
        <div className="flex items-center gap-6">

          <Skeleton className="h-20 w-20 rounded-3xl" />

          <div className="space-y-3">

            <Skeleton className="h-4 w-32" />

            <Skeleton className="h-10 w-64" />

            <Skeleton className="h-5 w-96" />

          </div>

        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                border
                border-zinc-800
                p-5
              "
            >
              <Skeleton className="h-8 w-8" />

              <Skeleton className="mt-4 h-6 w-24" />

              <Skeleton className="mt-2 h-4 w-20" />

            </div>
          ))}

        </div>

      </section>

      {/* ==========================================
          Tabs Skeleton
      ========================================== */}

      <div className="flex flex-wrap gap-3">

        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-10 w-28 rounded-full"
          />
        ))}

      </div>

      {/* ==========================================
          Content Skeleton
      ========================================== */}

      {Array.from({ length: 3 }).map((_, section) => (
        <section
          key={section}
          className="space-y-6"
        >
          <div>

            <Skeleton className="h-7 w-52" />

            <Skeleton className="mt-2 h-4 w-36" />

          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index}>

                <Skeleton className="aspect-square w-full rounded-3xl" />

                <Skeleton className="mt-4 h-5 w-3/4" />

                <Skeleton className="mt-2 h-4 w-1/2" />

              </div>
            ))}

          </div>

        </section>
      ))}

      {/* ==========================================
          FUTURE
          ------------------------------------------
          □ Progressive Loading
          □ Shimmer Animation
          □ Virtualized Skeleton
          □ Adaptive Skeleton
          ========================================== */}

    </main>
  );
}