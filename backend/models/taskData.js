import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    tid: { type: mongoose.Schema.Types.ObjectId, auto: true },
    tname: { type: String, required: true },
    tdesc: { type: String, default: null },
    tchecked: { type: Boolean, required: true },
    timportant: { type: Boolean, required: true },
});

const userTasksSchema = new mongoose.Schema({
    uid: { type: Number, unique: true },
    task: [taskSchema]
});

export default mongoose.model('task', userTasksSchema);