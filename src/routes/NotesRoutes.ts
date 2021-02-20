import { Request, Response, Router } from "express";

import Note from "../models/Notes";

class NotesRoutes{

    public router: Router

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async createNote(req: Request, res: Response){
        let {title, content, creator} = req.body;

        if(!title || !content || !creator){
            return res.status(400).json({message: "Missing values to create note"});
        }

        let newNote = new Note({title, content, creator});
        await newNote.save();
        

        res.status(200).json({
            data: {_id:newNote._id},
            message: "Note created and saved"
        });
    }

    public async getNote(req: Request, res:Response){
        let {userId, postId} = req.body;
        // TODO: POST ID TO SEARCH BY USER ID AND POST ID
        if(!userId){
            return res.status(400).json({message: "Missing values to get the note"});
        }

        let note = await Note.findOne({creator: userId}).select('_id title content');

        res.status(200).json({
            data: note,
            message: "Note found"
        });
    }

    public async updateNote(req: Request, res:Response){
        let noteId = req.params.noteId
        let {title, content} = req.body;

        if(!title || !content || !noteId){
            res.status(400).json({message: "Missing values to update note"});
        }

        await Note.findByIdAndUpdate(
            {_id: noteId},
            {"$set": {"title": title, "content": content}}
            );
        res.status(200).json({message: "Note Updated"});
    }

    routes(){
        this.router.post('/', this.createNote);
        this.router.get('/', this.getNote);
        this.router.put('/:noteId', this.updateNote);
    }
}

const notesRoutes = new NotesRoutes();
export default notesRoutes.router;
