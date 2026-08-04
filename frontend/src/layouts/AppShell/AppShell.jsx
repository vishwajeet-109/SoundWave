import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import MainContent from "../Main";
import PlayerBar from "../Player";

export default function AppShell({ children }) {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">

      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Topbar />

        <MainContent>
          {children}
        </MainContent>

      </div>

      <PlayerBar />

    </div>
  );
}