import { Schema, model, Document } from 'mongoose';

interface PlaylistDoc extends Document {
    name: string;
    description?: string;
    createdBy: string;
    songs: string[];
}

const playlistSchema = new Schema<PlaylistDoc>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: String,
        required: true
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }]
});

const Playlist = model<PlaylistDoc>('Playlist', playlistSchema);

export default Playlist;
