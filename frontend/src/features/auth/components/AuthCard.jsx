export default function AuthCard({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">

      <h2 className="mb-2 text-3xl font-bold">
        {title}
      </h2>

      <p className="mb-8 text-zinc-400">
        {subtitle}
      </p>

      {children}

    </div>
  );
}