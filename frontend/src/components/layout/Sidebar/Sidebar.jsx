import { useAuth } from '@/hooks/useAuth';
import { USER_NAV, ARTIST_NAV, ADMIN_NAV } from './sidebar.config';
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';

const normalizeRole = (value) => String(value ?? '').trim().toUpperCase();

const Sidebar = () => {
  const { user } = useAuth();
  const role = normalizeRole(user?.role);

  const getNavItems = () => {
    if (role === 'ADMIN' || role === 'SUPER_ADMIN') return ADMIN_NAV;
    if (role === 'ARTIST') return ARTIST_NAV;
    return USER_NAV;
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-[#080808] border-r border-[#2A2A2A] flex flex-col h-full select-none">
      <SidebarLogo />
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <SidebarItem
            key={item.path}
            title={item.label}
            path={item.path}
            icon={item.icon}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;