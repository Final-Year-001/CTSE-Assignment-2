import express from "express";
import songRouter from "./songs/song-router";

const router = express.Router();

router.use("/api/v1/songs", songRouter);

export default router;
