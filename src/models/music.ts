import mongoose, { Schema, Document } from "mongoose";

export interface IMusic extends Document {
    name: String,
    url: String,
    author: String,
    genre: String,
    lyric: String
}

const MusicSchema: Schema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    lyric: { type: String, required: false },
});

export default mongoose.model<IMusic>('Music', MusicSchema);

