import { Schema, model } from 'mongoose';

const GroupSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    owner: {type:Schema.Types.ObjectId, ref: 'User', required: true},
    students: [{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }]
});

export default model('Groups', GroupSchema);
