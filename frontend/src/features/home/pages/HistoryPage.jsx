import { useEffect, useState } from "react";
import historyService from "@/services/historyService";
import Loader from "@/shared/ui/loader";
import EmptyState from "@/shared/ui/states/EmptyState";
import MusicCard from "@/features/home/components/MusicCard";
import { usePlayerContext } from "@/context/PlayerContext";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { playSong } = usePlayerContext();

  useEffect(() => {
    async function fetchHistory() {
      try {
        setLoading(true);
        setError(false);
        const res = await historyService.getHistory();
        
        // Safe data extraction with array fallback
        const data = res?.data || res?.history || res || [];
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load history:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) {
    return <Loader variant="page" text="Loading history..." />;
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center p-8 text-center">
        <p className="text-red-500 font-medium">Failed to load listening history. Please try again later.</p>
      </div>
    );
  }

  if (!history.length) {
    return (
      <div className="p-8">
        <EmptyState
          title="No listening history"
          description="Songs you play will appear here automatically."
        />
      </div>
    );
  }

  // Extract songs list safely for the queue
  const songList = history.map(item => item?.song || item).filter(Boolean);

  return (
    <div className="p-8 text-zinc-100 max-w-7xl mx-auto space-y-6 pb-32">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Listening History</h1>
        <p className="text-zinc-400 text-sm mt-1">Tracks you have played recently</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {history.map((item, index) => {
          const song = item?.song || item;
          if (!song || typeof song !== "object") return null;
          return (
            <MusicCard 
              key={song._id || index} 
              song={song} 
              onPlay={(clickedSong) => playSong(clickedSong, songList)} 
            />
          );
        })}
      </div>
    </div>
  );
}