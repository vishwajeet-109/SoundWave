import {
  Home,
  Search,
  Library,
  ListMusic,
  User,
  Upload,
  BarChart3,
  FolderOpen,
  Tags,
  ShieldAlert,
  Flag,
  LayoutDashboard,
} from "lucide-react";

export const sidebarConfig = {

  USER: [

    {
      title: "Browse",

      items: [

        {
          label: "Home",
          icon: Home,
          to: "/",
        },

        {
          label: "Search",
          icon: Search,
          to: "/search",
        },

        {
          label: "Library",
          icon: Library,
          to: "/library",
        },

        {
          label: "Queue",
          icon: ListMusic,
          to: "/queue",
        },

        {
          label: "Profile",
          icon: User,
          to: "/profile",
        },

      ],

    },

  ],

  ARTIST: [

    {
      title: "Browse",

      items: [

        {
          label: "Home",
          icon: Home,
          to: "/",
        },

        {
          label: "Search",
          icon: Search,
          to: "/search",
        },

      ],

    },

    {
      title: "Artist",

      items: [

        {
          label: "Dashboard",
          icon: LayoutDashboard,
          to: "/artist/dashboard",
        },

        {
          label: "Upload Song",
          icon: Upload,
          to: "/artist/upload",
        },

        {
          label: "My Songs",
          icon: Library,
          to: "/artist/songs",
        },

        {
          label: "Analytics",
          icon: BarChart3,
          to: "/artist/analytics",
        },

      ],

    },

  ],

  ADMIN: [

    {
      title: "Administration",

      items: [

        {
          label: "Dashboard",
          icon: LayoutDashboard,
          to: "/admin",
        },

        {
          label: "Song Approval",
          icon: ShieldAlert,
          to: "/admin/approval",
        },

        {
          label: "Categories",
          icon: FolderOpen,
          to: "/admin/categories",
        },

        {
          label: "Genres",
          icon: Tags,
          to: "/admin/genres",
        },

        {
          label: "Reports",
          icon: Flag,
          to: "/admin/reports",
        },

        {
          label: "Analytics",
          icon: BarChart3,
          to: "/admin/analytics",
        },

      ],

    },

  ],

};