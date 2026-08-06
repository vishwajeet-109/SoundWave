import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function LibrarySection({
  title,
  subtitle,
  count,
  children,
  onShowAll,
}) {
  if (!children) return null;

  return (
    <section className="space-y-6">

      {/* ==========================================
          Section Header
      ========================================== */}

      <div className="flex items-end justify-between">

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className="
                mt-1
                text-sm
                text-zinc-500
              "
            >
              {subtitle}
            </p>
          )}

          {count !== undefined && (
            <p
              className="
                mt-2
                text-xs
                uppercase
                tracking-widest
                text-zinc-600
              "
            >
              {count} Items
            </p>
          )}

        </div>

        {onShowAll && (
          <button
            type="button"
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

            <ChevronRight
              size={16}
            />
          </button>
        )}

      </div>

      {/* ==========================================
          Content
      ========================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
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

      {/* ==========================================
          FUTURE
          ------------------------------------------
          □ Infinite Scroll
          □ Virtualization
          □ Lazy Loading
          □ Grid/List Toggle
          □ Sort
          □ Filter
          □ Drag & Drop
          □ Multi Select
          □ Pin Section
          ========================================== */}

    </section>
  );
}