import { SONG_STATUS } from "../constants/songStatus.js";
import songApprovalService from "./songApprovalService.js";

class ApprovalService {
  async getPendingSongs() {
    return songApprovalService.listSongsByStatus({ status: SONG_STATUS.PENDING });
  }

  async getApprovedSongs() {
    return songApprovalService.listSongsByStatus({ status: SONG_STATUS.APPROVED });
  }

  async getRejectedSongs() {
    return songApprovalService.listSongsByStatus({ status: SONG_STATUS.REJECTED });
  }

  async getBlockedSongs() {
    return songApprovalService.listSongsByStatus({ status: SONG_STATUS.BLOCKED });
  }

  async approveSong(songId, admin) {
    return songApprovalService.approveSong({
      songId,
      adminId: admin._id,
      note: "",
      req: {
        ip: admin.ip || "",
        headers: { "user-agent": admin.userAgent || "" },
      },
    });
  }

  async rejectSong(songId, reason, admin) {
    return songApprovalService.rejectSong({
      songId,
      adminId: admin._id,
      reason,
      req: {
        ip: admin.ip || "",
        headers: { "user-agent": admin.userAgent || "" },
      },
    });
  }

  async blockSong(songId, admin) {
    return songApprovalService.blockSong({
      songId,
      adminId: admin._id,
      reason: "Blocked by admin review.",
      req: {
        ip: admin.ip || "",
        headers: { "user-agent": admin.userAgent || "" },
      },
    });
  }

  async getDashboardStats() {
    return songApprovalService.getApprovalStats();
  }
}

export default new ApprovalService();