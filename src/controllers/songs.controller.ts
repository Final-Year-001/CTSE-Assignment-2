import { Request, Response } from "express";
import Song from "../models/song";

// Controller function to create a new song
export const createSong = async (req: Request, res: Response) => {
  try {
    const { title, artist, album, durationInSeconds, filePath, genre, releaseDate } = req.body;

    const newSong = new Song({
      title,
      artist,
      album,
      durationInSeconds,
      filePath,
      genre,
      releaseDate,
    });

    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to retrieve a specific song by ID
export const getSongById = async (req: Request, res: Response) => {
  try {
    const song = await Song.findById(req.params.songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json(song);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update song information by ID
export const updateSong = async (req: Request, res: Response) => {
  try {
    const { title, artist, album, durationInSeconds, filePath, genre, releaseDate } = req.body;

    const updatedSong = await Song.findByIdAndUpdate(
      req.params.songId,
      { title, artist, album, durationInSeconds, filePath, genre, releaseDate },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.json(updatedSong);
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to delete a song by ID
export const deleteSong = async (req: Request, res: Response) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.songId);
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json({ message: "Song deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to search for songs by keyword
export const searchSongs = async (req: Request, res: Response) => {
  try {
    if (typeof req.query.q !== "string") {
      return res.status(400).json({ message: "Bad Request" });
    }

    const query: string = req.query.q || "";
    const songs = await Song.find({ $text: { $search: query } });
    res.json(songs);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
