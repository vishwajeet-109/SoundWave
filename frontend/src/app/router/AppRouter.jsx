import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import AppShell from "@/layouts/AppShell";

// Route Guards
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";
import { RoleRoute } from "@/components/auth/RoleRoute";

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

// Library (FIX: Using the actual Library feature module)
import Library from "@/features/library/pages/Library";

// Queue
import QueuePage from "@/features/home/pages/QueuePage";

// Profile
import ProfilePage from "@/features/home/pages/ProfilePage";

// New Artist Dashboard Import (FIX: Uncommented)
import { ArtistDashboard, UploadSong } from "@/features/artist-dashboard";
// New Admin Import
import { SongApproval, AdminDashboard } from "@/features/admin";

export default function AppRouter() {
  return (
    <Routes>
      {/* ===========================
            PUBLIC ROUTES
      ============================ */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* ===========================
            PROTECTED ROUTES
      ============================ */}
      <Route element={<ProtectedRoute />}>
        {/* Consumer App (Uses AppShell with standard Sidebar/Header) */}
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

        {/* ======================
                  Artist
        ======================= */}
        <Route
          element={
            <RoleRoute allowedRoles={["artist", "admin", "super_admin"]} />
          }
        >
          <Route path="/artist/dashboard" element={<ArtistDashboard />} />
          <Route path="/artist/upload" element={<UploadSong />} />
        </Route>

        {/* ======================
                  Admin
        ======================= */}
        <Route
          element={
            <RoleRoute allowedRoles={["admin", "super_admin", "moderator"]} />
          }
        >
          {/* FIX: Map the root admin route to the new AdminDashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/approval" element={<SongApproval />} />
        </Route>
      </Route>

      
      {/* ===========================  
          artitst creation route for admin panel
      ============================ */}
      <Route
        path="/admin/create-artist"
        element={
          <AdminRoute>
            <CreateArtistPage />
          </AdminRoute>
        }
      />


      {/* ===========================
            FALLBACK
      ============================ */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
