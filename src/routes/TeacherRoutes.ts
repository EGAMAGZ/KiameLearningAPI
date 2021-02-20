import { Request, Response, Router } from 'express';

import User from '../models/User';

class TeacherRoutes{

    public router: Router;
    
    constructor(){
        this.router = Router();
        this.routes();
    }

    public async createTeacher(req: Request, res: Response){
        let {name, email, password, username} = req.body;
        let isTeacher = true

        if(!name || !email || !password || !username){
            return res.status(400).json({message: "Missing values for User"});
        }

        let newUser = new User({name, email, password, username, isTeacher});
        await newUser.save();

        res.status(200).json({
            data:newUser, 
            message:"Succesfully created"
        });
    }

    public async getTeacher(req: Request, res: Response){
        let username = req.params.username;

        if(!username){
            return res.status(400).json({message: "Missing values for User"});
        }

        let user = await User.findOne({username});
        
        res.status(200).json({
            data: user,
            message: "User found"
        });
    }

    public async updateTeacher(req: Request, res: Response){
        let param_username = req.params.username;
        
        let isTeacher = true;

        if(!param_username){
            return res.status(400).json({message: "Missing parameters for User"});
        }

        let {name, email, password, username} = req.body;

        if(!name || !email || !password || !username){
            return res.status(400).json({message: "Missing values for User"});
        }

        let user = await User.findOneAndUpdate(
                {username: param_username},
                {name, email, password, username, isTeacher},
                {new: true}
            );
    
        res.status(200).json({
            data:user, 
            message: "User updated succed"
        });
    }

    public async deleteTeacher(req: Request, res: Response){
        let username = req.params.username;
        
        if(!username){
            return res.status(400).json({message: "Missing values for User"});
        }

        await User.findOneAndDelete({username})

        res.status(200).json({message: "User Succesfully deleted"});
    }

    public routes(){
        this.router.post('/', this.createTeacher);
        this.router.get('/:username', this.getTeacher);
        this.router.put('/:username', this.updateTeacher);
        this.router.delete('/:username', this.deleteTeacher);
    }
}

const teacherRoutes = new TeacherRoutes();
export default teacherRoutes.router;
