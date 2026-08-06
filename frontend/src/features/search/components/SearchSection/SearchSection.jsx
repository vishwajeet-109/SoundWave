import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function SearchSection({
  title,
  count,
  children,
  onShowAll,
}) {
  if (!children) return null;

  return (
    <section className="mb-12">

      <div className="mb-5 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          {count !== undefined && (
            <p className="mt-1 text-sm text-zinc-500">
              {count} Results
            </p>
          )}

        </div>

        {onShowAll && (
          <button
            onClick={onShowAll}
            className="
              flex
              items-center
              gap-1
              text-sm
              font-medium
              text-zinc-400
              transition
              hover:text-white
            "
          >
            Show All

            <ChevronRight size={16} />

          </button>
        )}

      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        {children}
      </motion.div>

    </section>
  );
}