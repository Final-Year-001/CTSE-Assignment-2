import express from "express";
import {
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addSongToPlaylist,
  removeSongsFromPlaylist,
} from "../../controllers/playlists.controller";

const playlistRouter = express.Router();

playlistRouter.post("/", createPlaylist);
playlistRouter.get("/:playlistId", getPlaylistById);
playlistRouter.put("/:playlistId", updatePlaylist);
playlistRouter.delete("/:playlistId", deletePlaylist);
playlistRouter.post("/:playlistId/add-song", addSongToPlaylist);
playlistRouter.post("/:playlistId/remove-songs", removeSongsFromPlaylist);

export default playlistRouter;
