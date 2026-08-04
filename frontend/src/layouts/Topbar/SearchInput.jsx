import { Search } from "lucide-react";
import { Input } from "@/shared/ui";

export default function SearchInput() {
  return (
    <div className="relative w-[380px] max-w-full">

      <Input
        placeholder="Search songs, artists, albums..."
        className="pl-11"
      />

      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

    </div>
  );
}