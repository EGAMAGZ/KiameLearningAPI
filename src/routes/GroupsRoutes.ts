import { Request, Response, Router } from "express";

import Groups from "../models/Groups";

class GroupsRoutes{

    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async createGroup(req: Request, res: Response){
        let {title, description, teacherId} = req.body;

        if(!title || !teacherId){
            return res.status(400).json({message: "Missing values for Group"});
        }

        let newGroup = new Groups({title, description, owner: teacherId});
        await newGroup.save();

        res.status(200).json({
            data:newGroup, 
            message:"Succesfully created"
        });
    }

    public async getGroupList(req: Request, res: Response){
        let userId = req.params.userId;

        if(!userId){
            return res.status(400).json({message: "Missing values to search groups"});
        }

        let groups = await Groups.find({students: userId})
            .populate('owner', 'name -_id').select('title description owner');

        res.status(200).json({
            data: groups,
            message: "Succesfully found list of groups"
        })
    }

    public async getGroup(req: Request, res: Response){
        let groupId = req.params.groupId;

        if(!groupId){
            return res.status(400).json({message: "Missing values to search the group"});
        }

        let group = await Groups.findOne({_id: groupId})
        .populate('owner', 'name -_id').populate('students', 'name -_id');

        res.status(200).json({
            data: group,
            message: "Group Found"
        });
    }

    public async getStudentList(req: Request, res: Response){
        let groupId = req.params.groupId;

        if(!groupId){
            return res.status(400).json({message: "Missing values to search groups"});
        }

        let students = await Groups.findOne({_id: groupId})
            .populate('students', 'name -_id').select('students -_id');
        
        res.status(200).json({
            data: students,
            message: "Stundents correctly found"
        });
    }

    public async joinGroup(req: Request, res: Response){
        let paramGroupId = req.params.groupId;

        let studentId = req.body.studentId;

        if(!studentId){
            return res.status(400).json({message: "Missing values to Join"});
        }

        await Groups.findOneAndUpdate(
            {_id:paramGroupId},
            {"$push": {"students": studentId}}
            );

        res.status(200).json({message: "Student Joined Correctly"});
    }

    routes(){
        this.router.post('/', this.createGroup);
        this.router.get('/list/:userId', this.getGroupList)
        this.router.get('/:groupId', this.getGroup);
        this.router.put('/join/:groupId', this.joinGroup);
        this.router.get('/students/:groupId', this.getStudentList);
    }
}

const groupsRoutes = new GroupsRoutes();
export default groupsRoutes.router;
