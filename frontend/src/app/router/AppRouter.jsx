import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AppShell from "@/layouts/AppShell";

// Route Guards
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";

// Auth
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";

// Home
import Home from "@/features/home/pages/Home";

// Search
import Search from "@/features/search/pages/Search";

// Albums
import AlbumDetails from "@/features/albums/pages/AlbumDetails";

// Artists
import ArtistDetails from "@/features/home/pages/ArtistDetails";

// Playlists
import PlaylistDetails from "@/features/home/pages/PlaylistDetails";

// Library
import LibraryPage from "@/features/home/pages/LibraryPage";

// Queue
import QueuePage from "@/features/home/pages/QueuePage";

// Profile
import ProfilePage from "@/features/home/pages/ProfilePage";

// Future Pages
// import ArtistDashboard from "@/features/artist/pages/Dashboard";
// import UploadSong from "@/features/artist/pages/UploadSong";
// import MySongs from "@/features/artist/pages/MySongs";
// import ArtistAnalytics from "@/features/artist/pages/Analytics";

// import AdminDashboard from "@/features/admin/pages/Dashboard";
// import SongApproval from "@/features/admin/pages/SongApproval";
// import Categories from "@/features/admin/pages/Categories";
// import Genres from "@/features/admin/pages/Genres";
// import Reports from "@/features/admin/pages/Reports";
// import AdminAnalytics from "@/features/admin/pages/Analytics";

export default function AppRouter() {
  return (
    <Routes>

      {/* ===========================
            PUBLIC ROUTES
      ============================ */}

      <Route element={<PublicRoute />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Route>

      {/* ===========================
            PROTECTED ROUTES
      ============================ */}

      <Route element={<ProtectedRoute />}>

        <Route element={<AppShell />}>

          <Route
            index
            element={<Home />}
          />

          <Route
            path="/search"
            element={<Search />}
          />

          <Route
            path="/library"
            element={<LibraryPage />}
          />

          <Route
            path="/queue"
            element={<QueuePage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/albums/:id"
            element={<AlbumDetails />}
          />

          <Route
            path="/artists/:id"
            element={<ArtistDetails />}
          />

          <Route
            path="/playlists/:id"
            element={<PlaylistDetails />}
          />

          {/* ======================
                  Artist
          ======================= */}

          {/*
          <Route
              path="/artist/dashboard"
              element={<ArtistDashboard />}
          />

          <Route
              path="/artist/upload"
              element={<UploadSong />}
          />

          <Route
              path="/artist/songs"
              element={<MySongs />}
          />

          <Route
              path="/artist/analytics"
              element={<ArtistAnalytics />}
          />
          */}

          {/* ======================
                  Admin
          ======================= */}

          {/*
          <Route
              path="/admin"
              element={<AdminDashboard />}
          />

          <Route
              path="/admin/approval"
              element={<SongApproval />}
          />

          <Route
              path="/admin/categories"
              element={<Categories />}
          />

          <Route
              path="/admin/genres"
              element={<Genres />}
          />

          <Route
              path="/admin/reports"
              element={<Reports />}
          />

          <Route
              path="/admin/analytics"
              element={<AdminAnalytics />}
          />
          */}

        </Route>

      </Route>

      {/* ===========================
            FALLBACK
      ============================ */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}