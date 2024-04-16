import { Request, Response } from "express";
import Playlist from "../models/playlist";

// Controller function to create a new playlist
export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const { name, description, createdBy } = req.body;

    const newPlaylist = new Playlist({
      name,
      description,
      createdBy,
      songs: [],
    });

    const savedPlaylist = await newPlaylist.save();
    res.status(201).json(savedPlaylist);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to retrieve a specific playlist by ID
export const getPlaylistById = async (req: Request, res: Response) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId).populate("songs");
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.json(playlist);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update playlist details by ID
export const updatePlaylist = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      req.params.playlistId,
      { name, description },
      { new: true }
    );

    if (!updatedPlaylist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.json(updatedPlaylist);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a playlist by ID
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const deletedPlaylist = await Playlist.findByIdAndDelete(req.params.playlistId);
    if (!deletedPlaylist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.json({ message: "Playlist deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to add a song to a playlist
export const addSongToPlaylist = async (req: Request, res: Response) => {
  try {
    const { playlistId } = req.params;
    const { songId } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to remove songs from a playlist
export const removeSongsFromPlaylist = async (req: Request, res: Response) => {
  try {
    const { playlistId } = req.params;
    const { songIds } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    songIds.forEach((songId: string) => {
      const index = playlist.songs.indexOf(songId);
      if (index !== -1) {
        playlist.songs.splice(index, 1);
      }
    });

    await playlist.save();

    res.json(playlist);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};
