import React from "react";
import { Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Artist Studio Layout & Pages
import DashboardLayout from "../features/artist-dashboard/components/DashboardLayout";
import DashboardHome from "../features/artist-dashboard/pages/DashboardHome";
import UploadSong from "../features/artist-dashboard/pages/UploadSong";
import MySongs from "../features/artist-dashboard/pages/MySongs";
import Analytics from "../features/artist-dashboard/pages/Analytics";
import Audience from "../features/artist-dashboard/pages/Audience";
import Earnings from "../features/artist-dashboard/pages/Earnings";
import Notifications from "../features/artist-dashboard/pages/Notifications";
import ProfileSettings from "../features/artist-dashboard/pages/ProfileSettings";
import AccountSettings from "../features/artist-dashboard/pages/AccountSettings";
import AccountSettings from "../features/artist-dashboard/pages/AccountSettings";

// Temporary Placeholder Component (Jin pages ki file abhi baki hai)
function PlaceholderPage({ title }) {
  return (
    <div className="p-8 text-zinc-100">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-zinc-400">This section is currently under development.</p>
    </div>
  );
}

export const ArtistRoutes = (
  <Route element={<ProtectedRoute allowedRole="artist" />}>
    <Route path="/artist" element={<DashboardLayout />}>
      {/* 1. Dashboard Home (/artist) */}
      <Route index element={<DashboardHome />} />

      {/* 2. Analytics (/artist/analytics) */}
      <Route path="analytics" element={<Analytics />} />

      {/* 3. Upload Track (/artist/upload) */}
      <Route path="upload" element={<UploadSong />} />

      {/* 4. Upload Album (/artist/upload-album) */}
      <Route path="upload-album" element={<PlaceholderPage title="Upload Album" />} />

      {/* 5. My Songs (/artist/my-songs) */}
      <Route path="my-songs" element={<MySongs />} />

      {/* 6. My Albums (/artist/my-albums) */}
      <Route path="my-albums" element={<PlaceholderPage title="My Albums" />} />

      {/* 7. Followers / Audience (/artist/audience) */}
      <Route path="audience" element={<Audience />} />
      <Route path="followers" element={<Audience />} />

      {/* 8. Revenue / Earnings (/artist/earnings) */}
      <Route path="earnings" element={<Earnings />} />
      <Route path="revenue" element={<Earnings />} />

      {/* 9. Notifications (/artist/notifications) */}
      <Route path="notifications" element={<Notifications />} />

      {/* 10. Profile (/artist/profile) */}
      <Route path="profile" element={<ProfileSettings />} />

      {/* 11. Account Settings (/artist/settings) */}
      <Route path="settings" element={<AccountSettings />} />
    </Route>
  </Route>
);

export default ArtistRoutes;