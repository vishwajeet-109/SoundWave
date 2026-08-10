import { ROUTES } from '@/constants/routes';

export const USER_NAV = [
  { label: 'Home', path: ROUTES.HOME, icon: 'Home' },
  { label: 'Search', path: ROUTES.SEARCH, icon: 'Search' },
  { label: 'Library', path: ROUTES.LIBRARY, icon: 'Library' },
  { label: 'Queue', path: ROUTES.QUEUE, icon: 'Queue' },
  { label: 'History', path: ROUTES.HISTORY, icon: 'Clock' },
  { label: 'Profile', path: ROUTES.PROFILE, icon: 'User' },
  { label: 'Settings', path: ROUTES.SETTINGS, icon: 'Settings' },
];

export const ARTIST_NAV = [
  { label: 'Dashboard', path: ROUTES.ARTIST_DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Analytics', path: ROUTES.ARTIST_ANALYTICS, icon: 'BarChart' },
  { label: 'Upload Song', path: ROUTES.ARTIST_UPLOAD_SONG, icon: 'Upload' },
  { label: 'Upload Album', path: ROUTES.ARTIST_UPLOAD_ALBUM, icon: 'FolderPlus' },
  { label: 'My Songs', path: ROUTES.ARTIST_SONGS, icon: 'Music' },
  { label: 'My Albums', path: ROUTES.ARTIST_ALBUMS, icon: 'Disc' },
  { label: 'Followers', path: ROUTES.ARTIST_FOLLOWERS, icon: 'Users' },
  { label: 'Revenue', path: ROUTES.ARTIST_REVENUE, icon: 'DollarSign' },
  { label: 'Profile', path: ROUTES.ARTIST_PROFILE, icon: 'User' },
  { label: 'Notifications', path: ROUTES.ARTIST_NOTIFICATIONS, icon: 'Bell' },
  { label: 'Settings', path: ROUTES.ARTIST_SETTINGS, icon: 'Settings' },
];

export const ADMIN_NAV = [
  { label: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Approvals', path: ROUTES.ADMIN_APPROVALS, icon: 'CheckSquare' },
  { label: 'Users', path: ROUTES.ADMIN_USERS, icon: 'Users' },
  { label: 'Artists', path: ROUTES.ADMIN_ARTISTS, icon: 'Mic' },
  { label: 'Songs', path: ROUTES.ADMIN_SONGS, icon: 'Music' },
  { label: 'Albums', path: ROUTES.ADMIN_ALBUMS, icon: 'Disc' },
  { label: 'Categories', path: ROUTES.ADMIN_CATEGORIES, icon: 'Grid' },
  { label: 'Genres', path: ROUTES.ADMIN_GENRES, icon: 'Tag' },
  { label: 'Reports', path: ROUTES.ADMIN_REPORTS, icon: 'AlertTriangle' },
  { label: 'Analytics', path: ROUTES.ADMIN_ANALYTICS, icon: 'TrendingUp' },
  { label: 'Settings', path: ROUTES.ADMIN_SETTINGS, icon: 'Settings' },
];