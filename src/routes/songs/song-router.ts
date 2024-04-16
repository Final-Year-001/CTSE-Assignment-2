import express from "express";
import {
  createSong,
  getSongById,
  updateSong,
  deleteSong,
  searchSongs,
} from "../../controllers/songs.controller";

const songRouter = express.Router();

songRouter.post("/", createSong);
songRouter.get("/:songId", getSongById);
songRouter.put("/:songId", updateSong);
songRouter.delete("/:songId", deleteSong);
songRouter.get("/search", searchSongs);

export default songRouter;
