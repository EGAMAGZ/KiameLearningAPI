import { Request, Response, Router } from 'express';

import User from '../models/User';

class UserRoutes{

    public router: Router;
    
    constructor(){
        this.router = Router();
        this.routes();
    }

    public async createUser(req: Request, res: Response){
        let {name, email, password, username} = req.body;

        if(!name || !email || !password || !username){
            return res.status(400).json({message: "Missing values for User"});
        }

        let newUser = new User({name, email, password, username});
        await newUser.save();

        res.status(200).json({
            data:newUser, 
            message:"Succesfully created"
        });
    }

    public async getUser(req: Request, res: Response){
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

    public async updateUser(req: Request, res: Response){
        let param_username = req.params.username;

        if(!param_username){
            return res.status(400).json({message: "Missing parameters for User"});
        }

        let {name, email, password, username} = req.body;

        if(!name || !email || !password || !username){
            return res.status(400).json({message: "Missing values for User"});
        }

        let user = await User.findOneAndUpdate(
                {username: param_username},
                req.body,
                {new: true}
            );
    
        res.status(200).json({
            data:user, 
            message: "User updated succed"
        });
    }

    public async deleteUser(req: Request, res: Response){
        let username = req.params.username;
        
        if(!username){
            return res.status(400).json({message: "Missing values for User"});
        }

        await User.findOneAndDelete({username})

        res.status(200).json({message: "User Succesfully deleted"});
    }

    public routes(){
        this.router.post('/', this.createUser);
        this.router.get('/:username', this.getUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
