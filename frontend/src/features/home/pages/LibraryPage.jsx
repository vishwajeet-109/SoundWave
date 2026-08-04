export default function LibraryPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center text-white">
        <div className="mb-4 flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-primary" />
        </div>
        <h1 className="text-3xl font-semibold">Library</h1>
        <p className="mt-2 text-sm text-zinc-400">Loading your library...</p>
      </div>
    </div>
  );
}
