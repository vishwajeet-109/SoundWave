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

// Home & Core Pages
import Home from "@/features/home/pages/Home";
import Search from "@/features/search/pages/Search";
import QueuePage from "@/features/home/pages/QueuePage";
import ProfilePage from "@/features/home/pages/ProfilePage";
import HistoryPage from "@/features/home/pages/HistoryPage"; // Real History Page
import SettingsPage from "@/features/home/pages/SettingsPage"; // Real Settings Page

// Details Pages
import AlbumDetails from "@/features/albums/pages/AlbumDetails";
import ArtistDetails from "@/features/home/pages/ArtistDetails";
import PlaylistDetails from "@/features/home/pages/PlaylistDetails";

// Library
import Library from "@/features/library/pages/Library";

// Artist Dashboard Imports
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
import UploadAlbum from "@/features/artist-dashboard/pages/UploadAlbum";
import MyAlbums from "@/features/artist-dashboard/pages/MyAlbums";
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
        {/* User / Listener Section - Fully Functional Pages */}
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="library" element={<Library />} />
          <Route path="queue" element={<QueuePage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* Dynamic Detail Pages */}
          <Route path="albums/:id" element={<AlbumDetails />} />
          <Route path="artists/:id" element={<ArtistDetails />} />
          <Route path="playlists/:id" element={<PlaylistDetails />} />
        </Route>

        {/* Artist Section Routes */}
        <Route element={<RoleRoute allowedRoles={["ARTIST"]} />}>
          <Route path="/artist" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="upload" element={<UploadSong />} />
            <Route path="songs" element={<MySongs />} />
            <Route path="audience" element={<Audience />} />
            <Route path="followers" element={<Audience />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="revenue" element={<Earnings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="settings" element={<AccountSettings />} />
            <Route path="upload-album" element={<UploadAlbum />} />
            <Route path="albums" element={<MyAlbums />} />
            <Route path="my-albums" element={<MyAlbums />} />
          </Route>
        </Route>

        {/* Admin Section Routes */}
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
