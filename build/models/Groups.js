"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GroupSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: String,
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User'
        }]
});
exports.default = mongoose_1.model('Groups', GroupSchema);
