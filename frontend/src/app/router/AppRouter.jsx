import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// Layouts
import AppShell from "@/layouts/AppShell/AppShell";
import AuthLayout from "@/features/auth/components/AuthLayout";
import AdminLayout from "@/features/admin/components/AdminLayout";
import { DashboardLayout } from "@/features/artist-dashboard/components/DashboardLayout";

// Route Guards
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PublicRoute from "@/components/auth/PublicRoute";
import { RoleRoute } from "@/components/auth/RoleRoute";

// Auth
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";

// Home / User
import Home from "@/features/home/pages/Home";
import Search from "@/features/search/pages/Search";
import Library from "@/features/library/pages/Library";
import QueuePage from "@/features/home/pages/QueuePage";
import ProfilePage from "@/features/home/pages/ProfilePage";
import AlbumDetails from "@/features/albums/pages/AlbumDetails";
import ArtistDetails from "@/features/home/pages/ArtistDetails";
import PlaylistDetails from "@/features/home/pages/PlaylistDetails";

// Artist
import { ArtistDashboard, UploadSong } from "@/features/artist-dashboard";

// Admin
import { SongApproval, AdminDashboard } from "@/features/admin";
import CreateArtistPage from "@/features/admin/pages/CreateArtistPage"; 

export default function AppRouter() {
  return (
    <Routes>
      {/* ===========================
            PUBLIC ROUTES
      ============================ */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
        </Route>
      </Route>

      {/* ===========================
            PROTECTED USER ROUTES
      ============================ */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SEARCH} element={<Search />} />
          <Route path={ROUTES.LIBRARY} element={<Library />} />
          <Route path={ROUTES.QUEUE} element={<QueuePage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={`${ROUTES.ALBUMS}/:id`} element={<AlbumDetails />} />
          <Route path={`${ROUTES.ARTISTS}/:id`} element={<ArtistDetails />} />
          <Route path={`${ROUTES.PLAYLISTS}/:id`} element={<PlaylistDetails />} />
        </Route>
      </Route>

      {/* ======================
            ARTIST ROUTES
      ======================== */}
      <Route element={<RoleRoute allowedRoles={["artist", "admin", "super_admin"]} />}>
        {/* FIX: Mount the Layout here so the Sidebar renders! */}
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.ARTIST_DASHBOARD} element={<ArtistDashboard />} />
          <Route path={ROUTES.ARTIST_UPLOAD} element={<UploadSong />} />
        </Route>
      </Route>

      {/* ======================
            ADMIN ROUTES
      ======================= */}
      <Route element={<RoleRoute allowedRoles={["admin", "super_admin", "moderator"]} />}>
        {/* FIX: Mount the Admin Layout here! */}
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN_APPROVALS} element={<SongApproval />} />
          <Route path={ROUTES.ADMIN_CREATE_ARTIST} element={<CreateArtistPage />} />
        </Route>
      </Route>

      {/* ===========================
            FALLBACK
      ============================ */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}