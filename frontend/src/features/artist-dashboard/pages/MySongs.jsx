import React, { useState } from 'react';
import { Search, Play, Pause, Trash2, Music, Filter } from 'lucide-react';
import { useArtistRecentUploads, useDeleteArtistSong } from '../hooks/useArtistDashboard';

const MySongs = () => {
  const { data: songs = [], isLoading } = useArtistRecentUploads();
  const { mutate: deleteSong, isPending: isDeleting } = useDeleteArtistSong();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [playingSongId, setPlayingSongId] = useState(null);

  // Filter songs based on Search and Genre
  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Extract unique genres for filter dropdown
  const genres = ['All', ...new Set(songs.map((s) => s.genre).filter(Boolean))];

  const handleTogglePlay = (songId) => {
    setPlayingSongId((prev) => (prev === songId ? null : songId));
  };

  const handleDelete = (songId) => {
    if (window.confirm('Are you sure you want to delete this track?')) {
      deleteSong(songId);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-1">My Songs</h1>
          <p className="text-zinc-400 text-sm">Manage your uploaded tracks, view streams, and update details.</p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tracks by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-50 outline-none focus:border-green-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-zinc-500" />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-50 outline-none focus:border-green-500 transition-colors w-full sm:w-auto"
          >
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Songs Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-zinc-500 text-sm">Loading catalog...</div>
        ) : filteredSongs.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Music className="w-10 h-10 text-zinc-600 mx-auto" />
            <p className="text-zinc-400 text-sm font-medium">No songs found in your library.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950/60 border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Track</th>
                  <th className="py-3.5 px-4 font-semibold">Genre</th>
                  <th className="py-3.5 px-4 font-semibold">Streams</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {filteredSongs.map((song) => {
                  const isPlaying = playingSongId === song._id;
                  return (
                    <tr key={song._id} className="hover:bg-zinc-800/40 transition-colors group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-zinc-800 flex-shrink-0">
                            {song.coverUrl || song.coverImage ? (
                              <img
                                src={song.coverUrl || song.coverImage}
                                alt={song.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500">
                                <Music className="w-5 h-5" />
                              </div>
                            )}
                            <button
                              onClick={() => handleTogglePlay(song._id)}
                              className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity ${
                                isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                              }`}
                            >
                              {isPlaying ? (
                                <Pause className="w-5 h-5 text-green-500 fill-green-500" />
                              ) : (
                                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                              )}
                            </button>
                          </div>
                          <div>
                            <p className="font-medium text-zinc-50 truncate max-w-[200px] sm:max-w-[300px]">
                              {song.title}
                            </p>
                            <p className="text-xs text-zinc-500">
                              {song.createdAt ? new Date(song.createdAt).toLocaleDateString() : 'Recent'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300">
                          {song.genre || 'Unassigned'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-300 font-mono text-xs">
                        {(song.plays || song.streams || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDelete(song._id)}
                          disabled={isDeleting}
                          className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete Song"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySongs;