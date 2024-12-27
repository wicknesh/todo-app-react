import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid: { type: Number, unique: true},
    name: String,
    email: { type: String, unique: true},
    password: String
})

export default mongoose.model('user', userSchema);