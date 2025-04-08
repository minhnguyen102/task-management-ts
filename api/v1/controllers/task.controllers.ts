import Task from "../models/task.model"
import { Request, Response } from "express"

export const index = async (req: Request, res: Response) => {
    let find = {
        deleted : false
    }
    // Bộ lọc theo trạng thái
    if(req.query.status){
        find["status"] = req.query.status;
    }
    // Sắp xếp theo tiêu chí 
    let sort = {};
    sort[req.query.sortKey.toString()] = req.query.sortValue.toString();

    const tasks = await Task.find(find).sort(sort);
    res.json(tasks)
}

export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted : false
    })
    res.json(task)
}