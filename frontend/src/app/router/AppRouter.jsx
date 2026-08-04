import { Routes, Route } from "react-router-dom";

import AppShell from "@/layouts/AppShell";
import Home from "@/features/home/pages/Home";
import AlbumDetails from "@/features/albums/pages/AlbumDetails";
import ArtistDetails from "@/features/home/pages/ArtistDetails";
import PlaylistDetails from "@/features/home/pages/PlaylistDetails";
import LibraryPage from "@/features/home/pages/LibraryPage";
import QueuePage from "@/features/home/pages/QueuePage";
import ProfilePage from "@/features/home/pages/ProfilePage";
import Search from "@/features/search/pages/Search";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppShell>
            <Home />
          </AppShell>
        }
      />

      <Route
        path="/albums/:id"
        element={
          <AppShell>
            <AlbumDetails />
          </AppShell>
        }
      />

      <Route
        path="/artists/:id"
        element={
          <AppShell>
            <ArtistDetails />
          </AppShell>
        }
      />

      <Route
        path="/playlists/:id"
        element={
          <AppShell>
            <PlaylistDetails />
          </AppShell>
        }
      />

      <Route
        path="/search"
        element={
          <AppShell>
            <Search />
          </AppShell>
        }
      />

      <Route
        path="/library"
        element={
          <AppShell>
            <LibraryPage />
          </AppShell>
        }
      />

      <Route
        path="/queue"
        element={
          <AppShell>
            <QueuePage />
          </AppShell>
        }
      />

      <Route
        path="/profile"
        element={
          <AppShell>
            <ProfilePage />
          </AppShell>
        }
      />

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