export default function SearchSkeleton() {

  return (

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

      {Array.from({ length: 10 }).map((_, i) => (

        <div
          key={i}
          className="animate-pulse rounded-2xl bg-zinc-900 p-4"
        >

          <div className="aspect-square rounded-xl bg-zinc-800" />

          <div className="mt-4 h-4 rounded bg-zinc-800" />

          <div className="mt-3 h-3 w-2/3 rounded bg-zinc-800" />

        </div>

      ))}

    </div>

  );

}