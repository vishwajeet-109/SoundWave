import React from "react";
import { usePlayerContext } from "@/context/PlayerContext";
import MusicCard from "../components/MusicCard/MusicCard";

export default function QueuePage() {
  const { queue, currentSong, currentIndex, removeFromQueue } = usePlayerContext();

  // Current playing song ke baad wale upcoming songs ko filter karna
  const upcomingQueue =
    currentIndex >= 0 ? queue.slice(currentIndex + 1) : queue;

  return (
    <div className="p-8 text-zinc-100 max-w-5xl mx-auto space-y-8 pb-32">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Play Queue</h1>
        <p className="text-zinc-400 text-sm mt-1">Manage upcoming tracks in your listening session</p>
      </div>

      {/* Currently Playing */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-green-400">Now Playing</h2>
        {currentSong ? (
          <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex items-center gap-4">
            <img 
              src={currentSong.coverImage || currentSong.thumbnail} 
              alt={currentSong.title} 
              className="w-16 h-16 rounded-lg object-cover" 
            />
            <div>
              <p className="font-bold text-lg">{currentSong.title}</p>
              <p className="text-zinc-400 text-sm">{currentSong.artist?.name || currentSong.artist}</p>
            </div>
          </div>
        ) : (
          <p className="text-zinc-500 text-sm">No song currently playing.</p>
        )}
      </div>

      {/* Next Up Queue */}
      <div className="space-y-4 pt-6 border-t border-zinc-800">
        <h2 className="text-xl font-semibold">Next Up in Queue ({upcomingQueue.length})</h2>
        {upcomingQueue.length === 0 ? (
          <p className="text-zinc-500">Your queue is empty. Add songs to keep the music going!</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {upcomingQueue.map((song, relativeIndex) => {
              const absoluteIndex = currentIndex + 1 + relativeIndex;
              return (
                <div key={song._id || absoluteIndex} className="relative group">
                  <MusicCard song={song} />
                  <button
                    onClick={() => removeFromQueue(absoluteIndex)}
                    className="absolute top-2 right-2 bg-black/80 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs shadow-md"
                    title="Remove from queue"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}