"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotesSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: String,
    // assignature: { type: Schema.Types.ObjectId, ref: 'Group' },
    creator: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.model('Note', NotesSchema);
