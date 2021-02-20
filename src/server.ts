import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

import IndexRoutes  from './routes/IndexRoutes';
import UserRoutes from './routes/UserRoutes';
import TeacherRoutes from './routes/TeacherRoutes';
import GroupsRoutes from "./routes/GroupsRoutes";
import NotesRoutes from "./routes/NotesRoutes";

class Server {

    public app: express.Application;

    constructor() {
        this.app = express();

        this.config();
        this.routes();
    }

    config() {
        const MONGO_URI = 'mongodb://localhost/kiamedb';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
        .then(db => console.log("DB is connected"));

        this.app.set('port', process.env.PORT || 3000);

        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes(){
        this.app.use(IndexRoutes);
        this.app.use('/api/users', UserRoutes);
        this.app.use('/api/teachers', TeacherRoutes);
        this.app.use('/api/groups', GroupsRoutes);
        this.app.use('/api/notes/', NotesRoutes);
    }

    start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port', this.app.get('port')); 
        });
    }
}

const server = new Server();
server.start();
