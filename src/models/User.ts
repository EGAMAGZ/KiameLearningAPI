import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name:{type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    isTeacher: {type:Boolean, default: false}
});

export default model('User', UserSchema);
