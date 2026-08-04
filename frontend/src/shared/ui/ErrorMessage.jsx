import { AlertTriangle } from "lucide-react";

import Button from "./button";

export default function ErrorMessage({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  onRetry,
  retryLabel = "Try again",
}) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-300">
        <AlertTriangle size={20} />
      </div>

      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-zinc-400">{description}</p>

      {onRetry && (
        <Button className="mt-6" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
