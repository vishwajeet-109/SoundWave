// tests/unit/songApprovalService.test.js

import { jest } from "@jest/globals";
import { connectTestDB, disconnectTestDB, clearTestDB } from "./setupTestDB.js";
import mongoose from "mongoose";
import Song from "../models/Song.js";
import User from "../models/User.js";
import songApprovalService from "../services/songApprovalService.js";
import { SONG_STATUS } from "../constants/songStatus.js";
import { ROLES } from "../constants/roles.js";

// notificationService talks to Socket.IO / DB writes we don't need to
// verify here — mock it so this stays a focused unit test of the
// status-transition logic, not an integration test of notifications.
jest.mock("../services/notificationService.js", () => ({
  default: { sendNotification: jest.fn().mockResolvedValue({}) },
}));

const createTestArtist = () =>
  User.create({
    name: "Test Artist",
    email: `artist-${Date.now()}-${Math.random()}@test.com`,
    password: "hashedpassword",
    role: ROLES.ARTIST,
  });

const createTestSong = (artistId, status = SONG_STATUS.PENDING) =>
  Song.create({
    title: "Test Song",
    slug: `test-song-${Date.now()}-${Math.random()}`,
    artist: artistId,
    audioFile: "https://res.cloudinary.com/test/audio.mp3",
    duration: 180,
    status,
  });

beforeAll(connectTestDB);
afterEach(clearTestDB);
afterAll(disconnectTestDB);

describe("songApprovalService", () => {
  test("approves a PENDING song and sets approvedBy/approvedAt", async () => {
    const artist = await createTestArtist();
    const song = await createTestSong(artist._id, SONG_STATUS.PENDING);
    const adminId = new mongoose.Types.ObjectId();

    const result = await songApprovalService.approveSong({
      songId: song._id,
      adminId,
      note: "Looks good",
      req: {},
    });

    expect(result.status).toBe(SONG_STATUS.APPROVED);
    expect(result.approvedBy.toString()).toBe(adminId.toString());
    expect(result.approvedAt).toBeInstanceOf(Date);
  });

  test("rejects approving an already-APPROVED song (illegal transition)", async () => {
    const artist = await createTestArtist();
    const song = await createTestSong(artist._id, SONG_STATUS.APPROVED);
    const adminId = new mongoose.Types.ObjectId();

    await expect(
      songApprovalService.approveSong({ songId: song._id, adminId, req: {} })
    ).rejects.toMatchObject({ statusCode: 409 });
  });

  test("rejects a PENDING song only with a reason, and stores it", async () => {
    const artist = await createTestArtist();
    const song = await createTestSong(artist._id, SONG_STATUS.PENDING);
    const adminId = new mongoose.Types.ObjectId();

    const result = await songApprovalService.rejectSong({
      songId: song._id,
      adminId,
      reason: "Low audio quality",
      req: {},
    });

    expect(result.status).toBe(SONG_STATUS.REJECTED);
    expect(result.rejectedReason).toBe("Low audio quality");
  });

  test("throws 404 for a non-existent song", async () => {
    const adminId = new mongoose.Types.ObjectId();
    const fakeSongId = new mongoose.Types.ObjectId();

    await expect(
      songApprovalService.approveSong({ songId: fakeSongId, adminId, req: {} })
    ).rejects.toMatchObject({ statusCode: 404 });
  });
});
