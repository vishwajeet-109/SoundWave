import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Discover", path: "/discover" },
  { label: "Library", path: "/library" },
  { label: "Playlists", path: "/playlists" },
  { label: "Artists", path: "/artists" },
];

const recentlyPlayed = [
  { title: "Sunset Dreams", subtitle: "Mina Sol", path: "/albums/sunset-dreams" },
  { title: "Neon Nights", subtitle: "Aria Lane", path: "/artists/aria-lane" },
  { title: "Echoes", subtitle: "David Ross", path: "/albums/echoes" },
];

const trendingSongs = [
  { title: "Midnight City", subtitle: "Aurelia", duration: "3:42", path: "/albums/midnight-city" },
  { title: "Golden Hour", subtitle: "Niko", duration: "4:08", path: "/albums/golden-hour" },
  { title: "Ocean Breeze", subtitle: "Lina", duration: "2:55", path: "/albums/ocean-breeze" },
];

const popularArtists = [
  { title: "Aria Lane", subtitle: "1.2M listeners", path: "/artists/aria-lane" },
  { title: "David Ross", subtitle: "890K listeners", path: "/artists/david-ross" },
  { title: "Mina Sol", subtitle: "740K listeners", path: "/artists/mina-sol" },
];

const newReleases = [
  { title: "Fresh Start", subtitle: "New EP", path: "/albums/fresh-start" },
  { title: "Afterglow", subtitle: "Single", path: "/albums/afterglow" },
  { title: "Velvet Sky", subtitle: "Album", path: "/albums/velvet-sky" },
];

const featuredPlaylists = [
  { title: "Chill Vibes", subtitle: "24 songs", path: "/playlists/chill-vibes" },
  { title: "Workout Mix", subtitle: "18 songs", path: "/playlists/workout-mix" },
  { title: "Late Night", subtitle: "32 songs", path: "/playlists/late-night" },
];

function PlaceholderPage({ title, subtitle }) {
  return (
    <section className="section-card">
      <div className="section-header">
        <h4>{title}</h4>
      </div>

      <div className="card-item" style={{ justifyContent: "center", padding: "24px 16px" }}>
        <div className="text-center">
          <div className="eyebrow">Temporary view</div>
          <div className="card-title" style={{ fontSize: "22px", marginBottom: "8px" }}>
            {title}
          </div>
          <div className="card-subtitle">{subtitle}</div>
        </div>
      </div>
    </section>
  );
}

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="brand">SoundWave</div>

      <div className="nav-list">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="sidebar-card">
        <div className="eyebrow">Upgrade</div>
        <div className="sidebar-card-title">Premium listening experience</div>
      </div>
    </aside>
  );
}

function Topbar() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  return (
    <header className="topbar">
      <div>
        <div className="eyebrow">Music Experience</div>
        <div className="topbar-title">Good evening</div>
      </div>

      <div className="topbar-actions">
        <div className="history-buttons">
          <button type="button" className="history-btn" onClick={handleBack} aria-label="Go back">
            ←
          </button>
          <button type="button" className="history-btn" onClick={handleForward} aria-label="Go forward">
            →
          </button>
        </div>
        <button type="button" className="search-pill" onClick={() => navigate("/search")}>Search tracks, artists...</button>
        <button type="button" className="profile-pill" onClick={() => navigate("/profile")}>A</button>
      </div>
    </header>
  );
}

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-card">
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="eyebrow">Featured Release</div>
        <h3>Your personal soundtrack is ready.</h3>
        <p>
          Discover curated playlists, fresh releases, and a refined listening experience built for focus.
        </p>

        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={() => navigate("/albums/featured")}>Play Now</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/queue")}>View Queue</button>
        </div>
      </div>
    </section>
  );
}

function SectionCard({ title, items, type = "list", navigateTo }) {
  const navigate = useNavigate();

  return (
    <section className="section-card">
      <div className="section-header">
        <h4>{title}</h4>
        <button type="button" className="section-link" onClick={() => navigate(navigateTo)}>
          View all
        </button>
      </div>

      <div className={`section-grid ${type === "song" ? "song-grid" : ""}`}>
        {items.map((item, index) => (
          <button
            key={`${title}-${index}`}
            type="button"
            className={`card-item ${type === "song" ? "song-card" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <div className="card-meta">
              <div className="card-title">{item.title}</div>
              <div className="card-subtitle">{item.subtitle}</div>
            </div>

            {item.duration ? <div className="duration-pill">{item.duration}</div> : null}
          </button>
        ))}
      </div>
    </section>
  );
}

function BottomPlayer() {
  return (
    <div className="bottom-player">
      <div className="player-left">
        <div className="player-art" />
        <div>
          <div className="player-title">Midnight City</div>
          <div className="player-subtitle">Aurelia • 3:42</div>
        </div>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <span>◀</span>
          <span className="play-btn">▶</span>
          <span>▶▶</span>
        </div>

        <div className="progress-row">
          <span>1:12</span>
          <div className="progress-bar">
            <div className="progress-fill" />
          </div>
          <span>3:42</span>
        </div>
      </div>

      <div className="player-right">
        <div className="volume-pill">♪ 78%</div>
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <>
      <HeroSection />

      <SectionCard title="Recently Played" items={recentlyPlayed} navigateTo="/library" />
      <SectionCard title="Trending Songs" items={trendingSongs} type="song" navigateTo="/discover" />
      <SectionCard title="Popular Artists" items={popularArtists} navigateTo="/artists" />
      <SectionCard title="New Releases" items={newReleases} navigateTo="/discover" />
      <SectionCard title="Featured Playlists" items={featuredPlaylists} navigateTo="/playlists" />
    </>
  );
}

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="content-area">
        <Topbar />

        <main className="main-content">{children}</main>

        <BottomPlayer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell><HomeContent /></AppShell>} />
      <Route path="/discover" element={<AppShell><PlaceholderPage title="Discover" subtitle="Loading discover content..." /></AppShell>} />
      <Route path="/search" element={<AppShell><PlaceholderPage title="Search" subtitle="Loading search results..." /></AppShell>} />
      <Route path="/library" element={<AppShell><PlaceholderPage title="Library" subtitle="Loading your library..." /></AppShell>} />
      <Route path="/queue" element={<AppShell><PlaceholderPage title="Queue" subtitle="Loading your queue..." /></AppShell>} />
      <Route path="/profile" element={<AppShell><PlaceholderPage title="Profile" subtitle="Loading your profile..." /></AppShell>} />
      <Route path="/playlists" element={<AppShell><PlaceholderPage title="Playlists" subtitle="Loading playlists..." /></AppShell>} />
      <Route path="/artists" element={<AppShell><PlaceholderPage title="Artists" subtitle="Loading artists..." /></AppShell>} />
      <Route path="/albums/:id" element={<AppShell><PlaceholderPage title="Album Details" subtitle="Loading album..." /></AppShell>} />
      <Route path="/artists/:id" element={<AppShell><PlaceholderPage title="Artist Details" subtitle="Loading artist..." /></AppShell>} />
      <Route path="/playlists/:id" element={<AppShell><PlaceholderPage title="Playlist Details" subtitle="Loading playlist..." /></AppShell>} />
      <Route path="*" element={<AppShell><PlaceholderPage title="Page" subtitle="This view is loading..." /></AppShell>} />
    </Routes>
  );
}