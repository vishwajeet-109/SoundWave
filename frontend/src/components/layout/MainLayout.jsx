import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header";
import RightSidebar from "./RightSidebar";
import MobileNavbar from "./MobileNavbar";

import MusicPlayer from "../player/MusicPlayer";

const MainLayout = () => {

  const [collapsed, setCollapsed] = useState(false);

  // TODO:
  // Replace with Auth Store
  const role = "USER";

  return (

    <div className="flex h-screen overflow-hidden bg-background text-white">

      {/* Sidebar */}

      <div className="hidden lg:block">

        <Sidebar
          role={role}
          collapsed={collapsed}
        />

      </div>

      {/* Main */}

      <div className="flex flex-1 flex-col overflow-hidden">

        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main
          className="
            flex-1
            overflow-y-auto
            bg-background
            px-6
            py-6
          "
        >

          <Outlet />

        </main>

        <MusicPlayer />

      </div>

      {/* Right Sidebar */}

      <div className="hidden xl:block">

        <RightSidebar />

      </div>

      {/* Mobile */}

      <div className="lg:hidden">

        <MobileNavbar />

      </div>

    </div>

  );

};

export default MainLayout;