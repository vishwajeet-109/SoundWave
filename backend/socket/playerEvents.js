// socket/playerEvents.js
//
// Lightweight cross-device player sync: when a user starts/pauses a
// song on one device, their other open sessions (same user room) can
// mirror it. This does NOT replace the streaming endpoint — it only
// carries player *state*, never audio data.

export const registerPlayerEvents = (io, socket) => {
  const userRoom = `user:${socket.user._id}`;

  socket.on("player:sync", (state) => {
    // Broadcast to the user's other connected devices, not back to self.
    socket.to(userRoom).emit("player:sync", {
      songId: state?.songId,
      isPlaying: !!state?.isPlaying,
      positionSeconds: Number(state?.positionSeconds) || 0,
      updatedAt: new Date().toISOString(),
    });
  });

  socket.on("player:queueUpdate", (queue) => {
    if (!Array.isArray(queue)) return;
    socket.to(userRoom).emit("player:queueUpdate", queue.slice(0, 200));
  });
};
