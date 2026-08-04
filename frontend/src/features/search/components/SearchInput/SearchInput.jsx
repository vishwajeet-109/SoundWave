import { Search, X } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  onClear,
}) {
  return (
    <div className="relative">

      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder="What do you want to listen to?"
        className="
          h-14
          w-full
          rounded-full
          border
          border-zinc-800
          bg-zinc-900/80
          pl-14
          pr-14
          text-white
          placeholder:text-zinc-500
          backdrop-blur-xl
          transition-all
          duration-300
          focus:border-primary
          focus:ring-4
          focus:ring-primary/20
          focus:outline-none
        "
      />

      {value && (

        <button
          onClick={onClear}
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            rounded-full
            p-1
            text-zinc-500
            transition
            hover:bg-zinc-800
            hover:text-white
          "
        >
          <X size={18}/>
        </button>

      )}

    </div>
  );
}