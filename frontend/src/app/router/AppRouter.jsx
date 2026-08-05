import { Routes, Route } from "react-router-dom";

import AppShell from "@/layouts/AppShell";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";

import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";

import Home from "@/features/home/pages/Home";
import Search from "@/features/search/pages/Search";
import AlbumDetails from "@/features/albums/pages/AlbumDetails";
import ArtistDetails from "@/features/home/pages/ArtistDetails";
import PlaylistDetails from "@/features/home/pages/PlaylistDetails";
import LibraryPage from "@/features/home/pages/LibraryPage";
import QueuePage from "@/features/home/pages/QueuePage";
import ProfilePage from "@/features/home/pages/ProfilePage";

export default function AppRouter() {
  return (
    <Routes>

      {/* Public Routes */}

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

      {/* Protected Routes */}

      <Route element={<ProtectedRoute />}>

        <Route element={<AppShell />}>

          <Route
            index
            element={<Home />}
          />

          <Route
            path="search"
            element={<Search />}
          />

          <Route
            path="library"
            element={<LibraryPage />}
          />

          <Route
            path="queue"
            element={<QueuePage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />

          <Route
            path="albums/:id"
            element={<AlbumDetails />}
          />

          <Route
            path="artists/:id"
            element={<ArtistDetails />}
          />

          <Route
            path="playlists/:id"
            element={<PlaylistDetails />}
          />

        </Route>

      </Route>

      <Route
        path="*"
        element={
          <div className="flex min-h-screen items-center justify-center text-4xl text-white">
            404
          </div>
        }
      />

    </Routes>
  );
}