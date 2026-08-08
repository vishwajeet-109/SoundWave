import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AppShell from "@/layouts/AppShell";
import AdminLayout from "@/features/admin/components/AdminLayout";
import DashboardLayout from "@/features/artist-dashboard/components/DashboardLayout";

// Route Guards
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";
import RoleRoute from "@/components/auth/RoleRoute";

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
import Library from "@/features/library/pages/Library";

// Queue
import QueuePage from "@/features/home/pages/QueuePage";

// Profile
import ProfilePage from "@/features/home/pages/ProfilePage";
import CreateArtistPage from "@/features/admin/pages/CreateArtistPage";
import { ArtistDashboard, UploadSong } from "@/features/artist-dashboard";

// Admin Imports
import { SongApproval, AdminDashboard } from "@/features/admin";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/albums/:id" element={<AlbumDetails />} />
          <Route path="/artists/:id" element={<ArtistDetails />} />
          <Route path="/playlists/:id" element={<PlaylistDetails />} />
        </Route>

        <Route element={<RoleRoute allowedRoles={["ARTIST"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/artist/dashboard" element={<ArtistDashboard />} />
            <Route path="/artist/upload" element={<UploadSong />} />
          </Route>
        </Route>

        <Route element={<RoleRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="approval" element={<SongApproval />} />
            <Route path="create-artist" element={<CreateArtistPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}