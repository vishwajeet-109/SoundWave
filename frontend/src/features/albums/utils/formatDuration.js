// Song/album `duration` fields are stored in seconds (Number, default 0)
// per backend/models/Song.js and backend/models/Album.js.

export function formatTrackDuration(totalSeconds) {
  if (!totalSeconds || Number.isNaN(totalSeconds)) return "--:--";

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function formatAlbumDuration(totalSeconds) {
  if (!totalSeconds || Number.isNaN(totalSeconds)) return null;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }

  if (minutes > 0) {
    return `${minutes} min`;
  }

  return `${Math.floor(totalSeconds)} sec`;
}
