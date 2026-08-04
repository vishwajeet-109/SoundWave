import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function SectionHeader({
  title,
  subtitle,
  href,
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>

      {href && (
        <Link
          to={href}
          className="flex items-center gap-1 text-sm font-medium text-zinc-400 transition hover:text-white"
        >
          Show all

          <ChevronRight size={16} />
        </Link>
      )}
    </div>
  );
}