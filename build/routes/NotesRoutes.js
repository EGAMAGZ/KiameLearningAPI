"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Notes_1 = __importDefault(require("../models/Notes"));
class NotesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { title, content, creator } = req.body;
            if (!title || !content || !creator) {
                return res.status(400).json({ message: "Missing values to create note" });
            }
            let newNote = new Notes_1.default({ title, content, creator });
            yield newNote.save();
            res.status(200).json({
                data: { _id: newNote._id
                },
                message: "Note created and saved"
            });
        });
    }
    getNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { userId, postId } = req.body;
            // TODO: POST ID TO SEARCH BY USER ID AND POST ID
            if (!userId) {
                return res.status(400).json({ message: "Missing values to get the note" });
            }
            let note = yield Notes_1.default.findOne({ creator: userId }).select('_id title content');
            res.status(200).json({
                data: note,
                message: "Note found"
            });
        });
    }
    updateNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let noteId = req.params.noteId;
            let { title, content } = req.body;
            if (!title || !content || !noteId) {
                res.status(400).json({ message: "Missing values to update note" });
            }
            yield Notes_1.default.findByIdAndUpdate({ _id: noteId }, { "$set": { "title": title, "content": content } });
            res.status(200).json({ message: "Note Updated" });
        });
    }
    routes() {
        this.router.post('/', this.createNote);
        this.router.get('/', this.getNote);
        this.router.put('/:noteId', this.updateNote);
    }
}
const notesRoutes = new NotesRoutes();
exports.default = notesRoutes.router;
