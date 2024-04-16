import express from "express";
import songRouter from "./songs/song-router";
import playlistRouter from "./songs/playlist-router";

const router = express.Router();

router.use("/api/v1/songs", songRouter);
router.use("/api/v1/playlists", playlistRouter);

export default router;
