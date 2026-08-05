import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

const SidebarLogo = ({ collapsed = false }) => {
  return (
    <Link
      to="/"
      aria-label="Go to Home"
      className="block"
    >
      <motion.div
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration: 0.2,
        }}
        className="flex items-center gap-3 rounded-2xl"
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-green-500
            to-blue-500
            shadow-lg
            shadow-green-500/20
          "
        >
          <Music2
            size={24}
            className="text-white"
          />
        </div>

        {!collapsed && (
          <div className="overflow-hidden">
            <h1
              className="
                text-xl
                font-extrabold
                tracking-tight
                text-white
              "
            >
              SoundWave
            </h1>

            <p
              className="
                text-xs
                text-zinc-400
              "
            >
              Premium Music Platform
            </p>
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default SidebarLogo;