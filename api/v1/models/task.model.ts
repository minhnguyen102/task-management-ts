import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title : String,
    status : String,
    content : String,
    timeStart : Date,
    timeFinish : Date,
    createdBy : String,
    listUser : Array,
    taskParent : {
        type : String,
        default : ""
    },
    deleted : {
        type : Boolean,
        default : false
    },
    deleteAt : Date
},{timestamps : true})

const Task = mongoose.model("Task", taskSchema, "tasks")
export default Task;

// Export default khác export ở chỗ :
    // default => chỉ 1 chỗ import 