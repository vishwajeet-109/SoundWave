import { ROUTES } from '@/constants/routes';

export const sidebarConfig = {
  user: [
    { title: 'Home', path: ROUTES.HOME, icon: 'HomeIcon' },
    { title: 'Search', path: ROUTES.SEARCH, icon: 'SearchIcon' },
    { title: 'Library', path: ROUTES.LIBRARY, icon: 'LibraryIcon' },
    { title: 'Liked Songs', path: '/liked', icon: 'HeartIcon' },
    { title: 'Playlists', path: '/playlists', icon: 'PlaylistIcon' },
    { title: 'Albums', path: '/albums', icon: 'AlbumIcon' },
    { title: 'Artists', path: '/artists', icon: 'MicIcon' },
    { title: 'Profile', path: ROUTES.PROFILE, icon: 'UserIcon' },
    { title: 'Queue', path: ROUTES.QUEUE, icon: 'QueueIcon' },
    { title: 'History', path: '/history', icon: 'HistoryIcon' },
    { title: 'Settings', path: '/settings', icon: 'SettingsIcon' },
  ],
  artist: [
    { title: 'Dashboard', path: ROUTES.ARTIST_DASHBOARD, icon: 'DashboardIcon' },
    { title: 'Analytics', path: '/artist/analytics', icon: 'ChartIcon' },
    { title: 'My Songs', path: '/artist/songs', icon: 'MusicIcon' },
    { title: 'My Albums', path: '/artist/albums', icon: 'AlbumIcon' },
    { title: 'Upload Song', path: ROUTES.ARTIST_UPLOAD, icon: 'UploadIcon' },
    { title: 'Upload Album', path: '/artist/upload-album', icon: 'UploadCloudIcon' },
    { title: 'Revenue', path: '/artist/revenue', icon: 'DollarIcon' },
    { title: 'Followers', path: '/artist/followers', icon: 'UsersIcon' },
    { title: 'Profile', path: '/artist/profile', icon: 'UserIcon' },
    { title: 'Notifications', path: '/artist/notifications', icon: 'BellIcon' },
    { title: 'Settings', path: '/artist/settings', icon: 'SettingsIcon' },
  ],
  admin: [
    { title: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: 'DashboardIcon' },
    { title: 'Approvals', path: ROUTES.ADMIN_APPROVALS, icon: 'CheckIcon' },
    { title: 'Users', path: ROUTES.ADMIN_USERS, icon: 'UsersIcon' },
    { title: 'Artists', path: '/admin/artists', icon: 'MicIcon' },
    { title: 'Create Artist', path: ROUTES.ADMIN_CREATE_ARTIST, icon: 'PlusCircleIcon' },
    { title: 'Songs', path: '/admin/songs', icon: 'MusicIcon' },
    { title: 'Albums', path: '/admin/albums', icon: 'AlbumIcon' },
    { title: 'Categories', path: '/admin/categories', icon: 'CategoryIcon' },
    { title: 'Genres', path: '/admin/genres', icon: 'GenreIcon' },
    { title: 'Reports', path: ROUTES.ADMIN_REPORTS, icon: 'FlagIcon' },
    { title: 'Analytics', path: '/admin/analytics', icon: 'ChartIcon' },
    { title: 'Settings', path: '/admin/settings', icon: 'SettingsIcon' },
  ]
};