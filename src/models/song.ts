import { Schema, model, Document } from 'mongoose';

interface SongDoc extends Document {
    title: string;
    artist: string;
    album?: string;
    durationInSeconds: number;
    filePath: string;
    genre?: string;
    releaseDate?: Date;
}

const songSchema = new Schema<SongDoc>({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String
    },
    durationInSeconds: {
        type: Number,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    releaseDate: {
        type: Date
    }
});

const Song = model<SongDoc>('Song', songSchema);

export default Song;
