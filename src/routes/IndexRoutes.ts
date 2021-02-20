import {Request, Response, Router} from 'express';

class IndexRoutes{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    routes(){
        this.router.get('/', (req, res)=> res.send("API: /api/"));
    }
}

const indexRoutes =new IndexRoutes();
export default indexRoutes.router