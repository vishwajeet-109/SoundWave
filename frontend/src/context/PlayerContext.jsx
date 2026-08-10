import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import historyService from "@/services/historyService"; // 🚀 Added history service import

const PlayerContext = createContext(null);

export function resetPlayerForLogout() {
  const resetPlayer = globalThis.__soundwavePlayerReset;

  if (typeof resetPlayer === "function") {
    resetPlayer();
    return true;
  }

  return false;
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [queue, setQueue] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(-1);

  const [currentSong, setCurrentSong] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(0.8);

  const [isMuted, setIsMuted] = useState(false);

  const [shuffle, setShuffle] = useState(false);

  const [repeat, setRepeat] = useState(false);

  const stopSong = useCallback(() => {
    const audio = audioRef.current;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
      audio.load();
    } catch (error) {
      console.warn("Player stop warning:", error);
    }

    setCurrentSong(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  const resetPlayerState = useCallback(() => {
    stopSong();
    setQueue([]);
    setCurrentIndex(-1);
  }, [stopSong]);

  useEffect(() => {
    globalThis.__soundwavePlayerReset = resetPlayerState;
    globalThis.__soundwaveAudioRef = audioRef.current;

    return () => {
      if (globalThis.__soundwaveAudioRef === audioRef.current) {
        delete globalThis.__soundwaveAudioRef;
      }

      if (globalThis.__soundwavePlayerReset === resetPlayerState) {
        delete globalThis.__soundwavePlayerReset;
      }
    };
  }, [resetPlayerState]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );
    };
  }, []);

  /*
|--------------------------------------------------------------------------
| Player Functions
|--------------------------------------------------------------------------
*/

const playSong = async (song, playlist = []) => {
  if (!song) return;

  try {
    let activeQueue = playlist;
    
    if (!activeQueue.length) {
      activeQueue = queue.length ? queue : [song];
    }

    setQueue(activeQueue);

    const index = activeQueue.findIndex(
      (item) => (item._id || item.id) === (song._id || song.id)
    );

    setCurrentIndex(index !== -1 ? index : 0);
    setCurrentSong(song);

    audioRef.current.src =
      song.audioFile ||
      song.audioUrl ||
      song.url ||
      "";

    await audioRef.current.play();

    setIsPlaying(true);

    // 🚀 CRITICAL FIX: Record play history to backend
    const songId = song._id || song.id;
    if (songId) {
      historyService.addToHistory(songId).catch((err) => {
        console.warn("Failed to record history:", err.response?.data || err.message);
      });
    }

  } catch (error) {
    console.error("Play Error:", error);
  }
};

const addToQueue = (song) => {
  if (!song) return;
  setQueue((prev) => [...prev, song]);
};

const removeFromQueue = (index) => {
  setQueue((prev) => prev.filter((_, i) => i !== index));
};

const togglePlayPause = async () => {
  if (!currentSong) return;

  if (isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  } else {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error(error);
    }
  }
};

const playNext = async () => {
  if (!queue.length) return;

  let nextIndex;

  if (shuffle) {
    nextIndex = Math.floor(
      Math.random() * queue.length
    );
  } else {
    nextIndex = currentIndex + 1;

    if (nextIndex >= queue.length) {
      if (!repeat) {
        setIsPlaying(false);
        return;
      }

      nextIndex = 0;
    }
  }

  setCurrentIndex(nextIndex);

  playSong(
    queue[nextIndex],
    queue
  );
};

const playPrevious = async () => {
  if (!queue.length) return;

  let prevIndex = currentIndex - 1;

  if (prevIndex < 0) {
    prevIndex = queue.length - 1;
  }

  setCurrentIndex(prevIndex);

  playSong(
    queue[prevIndex],
    queue
  );
};

const seek = (seconds) => {
  audioRef.current.currentTime = seconds;
  setCurrentTime(seconds);
};

const changeVolume = (value) => {
  const newVolume = Number(value);

  setVolume(newVolume);

  audioRef.current.volume = newVolume;

  if (newVolume === 0) {
    setIsMuted(true);
  } else {
    setIsMuted(false);
  }
};

const toggleMute = () => {
  setIsMuted((prev) => !prev);
};

const toggleShuffle = () => {
  setShuffle((prev) => !prev);
};

const toggleRepeat = () => {
  setRepeat((prev) => !prev);
};

useEffect(() => {
  const audio = audioRef.current;

  const handleEnded = () => {
    playNext();
  };

  audio.addEventListener(
    "ended",
    handleEnded
  );

  return () => {
    audio.removeEventListener(
      "ended",
      handleEnded
    );
  };
}, [
  queue,
  currentIndex,
  shuffle,
  repeat,
]);

  const value = useMemo(
    () => ({
      audioRef,

      queue,
      setQueue,

      currentIndex,
      setCurrentIndex,

      currentSong,
      setCurrentSong,

      isPlaying,
      setIsPlaying,

      currentTime,
      setCurrentTime,

      duration,
      setDuration,

      volume,
      setVolume,

      isMuted,
      setIsMuted,

      shuffle,
      setShuffle,

      repeat,
      setRepeat,

      playSong,
      addToQueue,
      removeFromQueue,
      togglePlayPause,
      stopSong,
      resetPlayerState,

      playNext,
      playPrevious,

      seek,

      changeVolume,

      toggleMute,

      toggleShuffle,
      toggleRepeat,
    }),
    [
      queue,
      currentIndex,
      currentSong,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      shuffle,
      repeat,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error(
      "usePlayerContext must be used inside PlayerProvider"
    );
  }

  return context;
}