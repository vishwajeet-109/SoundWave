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
import UploadSong from "@/features/artist-dashboard/pages/UploadSong";
import DashboardHome from "@/features/artist-dashboard/pages/DashboardHome";
import Analytics from "@/features/artist-dashboard/pages/Analytics";
import Audience from "@/features/artist-dashboard/pages/Audience";
import Earnings from "@/features/artist-dashboard/pages/Earnings";
import Notifications from "@/features/artist-dashboard/pages/Notifications";
import ProfileSettings from "@/features/artist-dashboard/pages/ProfileSettings";
import AccountSettings from "@/features/artist-dashboard/pages/AccountSettings";
import MySongs from "@/features/artist-dashboard/pages/MySongs";

// Admin Imports
import { SongApproval, AdminDashboard } from "@/features/admin";

function PlaceholderPage({ title, subtitle }) {
  return (
    <div className="p-8 text-zinc-100">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      {subtitle && <p className="text-zinc-400">{subtitle}</p>}
    </div>
  );
}

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
          <Route path="/artist" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="upload" element={<UploadSong />} />
            <Route path="upload-album" element={<PlaceholderPage title="Upload Album" />} />
            <Route path="songs" element={<MySongs />} />
            <Route path="albums" element={<PlaceholderPage title="My Albums" />} />
            <Route path="my-songs" element={<MySongs />} />
            <Route path="my-albums" element={<PlaceholderPage title="My Albums" />} />
            <Route path="audience" element={<Audience />} />
            <Route path="followers" element={<Audience />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="revenue" element={<Earnings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="settings" element={<AccountSettings />} />
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