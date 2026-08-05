import useAuth from "@/hooks/useAuth";

import SidebarLogo from "./SidebarLogo";
import SidebarSection from "./SidebarSection";
import { sidebarConfig } from "./sidebar.config";

export default function Sidebar() {

  const { user } = useAuth();

  const role = user?.role || "USER";

  const sections =
    sidebarConfig[role] || sidebarConfig.USER;

  return (

    <aside
      className="
        hidden
        w-72
        border-r
        border-zinc-800
        bg-zinc-950
        p-6
        lg:block
      "
    >

      <SidebarLogo />

      {sections.map((section) => (

        <SidebarSection

          key={section.title}

          {...section}

        />

      ))}

    </aside>

  );

}