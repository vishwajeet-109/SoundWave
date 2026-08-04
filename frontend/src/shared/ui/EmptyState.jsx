import { Sparkles } from "lucide-react";

import Button from "./button";

export default function EmptyState({
  title = "Nothing here yet",
  description = "There is no content to display right now.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
        <Sparkles size={20} />
      </div>

      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-zinc-400">{description}</p>

      {actionLabel && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
