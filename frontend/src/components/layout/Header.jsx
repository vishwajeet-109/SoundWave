import { useState } from "react";
import { Search, Bell, LogOut, Mic2, ShieldCheck } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const [search, setSearch] = useState("");
  const notificationCount = 0; // Backend se replace hoga

  // Verify if user is allowed to see the Artist Dashboard
  const isArtistOrAdmin = user?.role === 'artist' || user?.role === 'admin' || user?.role === 'super_admin';

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        flex
        h-20
        items-center
        justify-between
        border-b
        border-zinc-800
        bg-zinc-950/80
        px-6
        backdrop-blur-xl
        shadow-lg
        shadow-black/20
      "
    >
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold">
          SoundWave
        </h2>
        <p className="text-sm text-zinc-500">
          Premium Music Platform
        </p>
      </div>

      {/* Search */}
      <div
        className="
          hidden
          w-[420px]
          items-center
          gap-3
          rounded-full
          border
          border-zinc-800
          bg-zinc-900
          px-5
          py-3
          transition-all
          duration-200
          focus-within:border-green-500
          md:flex
        "
      >
        <Search
          size={18}
          className="pointer-events-none text-zinc-500"
        />

        <input
          type="text"
          value={search}
          placeholder="Search songs, artists, albums..."
          onChange={(e) => setSearch(e.target.value)}
          className="
            flex-1
            bg-transparent
            text-sm
            outline-none
            placeholder:text-zinc-500
          "
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* ARTIST PORTAL BUTTON (Conditional) */}
        {isArtistOrAdmin && (
          <Link 
            to="/artist/dashboard"
            className="
              hidden
              md:flex
              items-center
              gap-2
              rounded-full
              border
              border-zinc-800
              bg-zinc-900
              px-4
              py-2.5
              text-sm
              font-medium
              text-zinc-300
              transition-all
              duration-200
              hover:border-green-500
              hover:text-green-500
            "
          >
            <Mic2 size={16} />
            Artist Portal
          </Link>
        )}

        {/* NOTE: Removed duplicate Artist Portal button. The first conditional above
            already covers artist/super_admin/admin visibility. Keeping a single
            Artist Portal entry to avoid duplicate rendering. */}

        {/* ADMIN PORTAL BUTTON (Conditional) */}
        {(user?.role === 'admin' || user?.role === 'moderator' || user?.role === 'super_admin') && (
          <Link 
            to="/admin/approval"
            className="hidden md:flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:border-blue-500 hover:text-blue-500 transition-colors"
          >
            <ShieldCheck size={16} /> Admin Portal
          </Link>
        )}

        {/* Notification */}
        <button
          className="
            relative
            rounded-full
            border
            border-zinc-800
            bg-zinc-900
            p-3
            transition-all
            duration-200
            hover:border-green-500
          "
        >
          <Bell size={18} />

          {notificationCount > 0 && (
            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-[10px]
                font-bold
                text-white
              "
            >
              {notificationCount}
            </span>
          )}
        </button>

        {/* User */}
        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-green-500
              to-blue-500
              font-bold
              text-white
            "
          >
            {user ? (
              user.name?.charAt(0)?.toUpperCase()
            ) : (
              <div className="h-4 w-4 animate-pulse rounded-full bg-white/40" />
            )}
          </div>

          <div className="hidden lg:block">
            <h4 className="font-semibold">
              {user?.name || "Loading..."}
            </h4>
            <span
              className="
                inline-flex
                rounded-full
                bg-green-500/15
                px-2
                py-0.5
                text-xs
                font-medium
                text-green-400
              "
            >
              {user?.role || "Guest"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="
              rounded-full
              border
              border-zinc-800
              bg-zinc-900
              p-3
              transition-all
              duration-200
              hover:border-red-500
              hover:bg-red-500/10
            "
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}