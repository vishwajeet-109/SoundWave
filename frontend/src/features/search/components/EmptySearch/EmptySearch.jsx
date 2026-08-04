import { SearchX } from "lucide-react";

export default function EmptySearch() {
  return (
    <div className="flex flex-col items-center justify-center py-24">

      <SearchX
        size={64}
        className="text-zinc-600"
      />

      <h2 className="mt-6 text-2xl font-bold text-white">
        No Results Found
      </h2>

      <p className="mt-2 text-zinc-400">
        Try another keyword.
      </p>

    </div>
  );
}