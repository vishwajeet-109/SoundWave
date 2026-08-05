import { info } from "./helpers/logger.js";
import authTests from "./auth/auth.test.js";

import songTests from "./songs/songs.test.js";
import albumTests from "./albums/albums.test.js";
import artistTests from "./artists/artists.test.js";
import playlistTests from "./playlists/playlists.test.js";

import searchTests from "./search/search.test.js";
import workflowTests from "./integration/fullWorkflow.test.js";

import categoryTests from "./category/category.test.js";
import genreTests from "./genre/genre.test.js";
import followTests from "./follow/follow.test.js";

import historyTests from "./history/history.test.js";
import likeTests from "./like/like.test.js";
import myLikesTests from "./myLikes/myLikes.test.js";

import notificationTests from "./notification/notification.test.js";

import queueTests from "./queue/queue.test.js";
import playbackTests from "./playback/playback.test.js";
import recommendationTests from "./recommendation/recommendation.test.js";

import reportTests from "./report/report.test.js";
import analyticsTests from "./analytics/analytics.test.js";
import dashboardTests from "./dashboard/dashboard.test.js";
import { printReport } from "./report.js";

async function run() {

    info("\n================================");
    info("SoundWave API Test");
    info("================================\n");

    await authTests();
    await songTests();
    await albumTests();
    await artistTests();
    await playlistTests();
    await searchTests();
    await workflowTests();

    await categoryTests();
    await genreTests();
    await followTests();

    await historyTests();
    await likeTests();
    await myLikesTests();

    await notificationTests();
    await queueTests();
    await playbackTests();
    await recommendationTests();

    await reportTests();
    await analyticsTests();
    await dashboardTests();

   

    printReport(); // <-- final report
}

run();