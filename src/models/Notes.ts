import { Schema, model } from "mongoose";

const NotesSchema = new Schema({
    title: {type: String, required: true},
    content: String,
    // assignature: { type: Schema.Types.ObjectId, ref: 'Group' },
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now}
});

export default model('Note', NotesSchema);
