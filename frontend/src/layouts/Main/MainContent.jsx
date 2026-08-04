export default function MainContent({ children }) {
  return (
    <main
      className="
        flex-1
        overflow-y-auto
        bg-gradient-to-b
        from-zinc-900
        via-zinc-950
        to-black
        pb-32
      "
    >
      <div className="mx-auto w-full max-w-[1800px] px-8 py-8">
        {children}
      </div>
    </main>
  );
}