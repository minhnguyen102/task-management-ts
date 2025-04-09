import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    tokenUser: String,
    status: {
        type : String,
        default : "active"
    },
    deleted: {
        type : Boolean,
        default : false
    },
    deletedAt : Date
},{ timestamps: true });

export const User = mongoose.model('User', userSchema, "users");

