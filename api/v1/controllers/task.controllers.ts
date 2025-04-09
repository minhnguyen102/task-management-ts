import Task from "../models/task.model"
import { Request, Response } from "express"
import { paginationHelper } from "../../../helpers/pagination"
import searchHelper from "../../../helpers/search"
import { constrainedMemory } from "process"

// {{BASE_URL}}/api/v1/tasks
export const index = async (req: Request, res: Response) => {
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }
    let find: Find = {
        deleted : false,
    }
    // Bộ lọc theo trạng thái
    if(req.query.status){
        find["status"] = req.query.status.toString();
    }
    // Hết Bộ lọc theo trạng thái

    // Sắp xếp theo tiêu chí 
    let sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey.toString()] = req.query.sortValue.toString();
    }
    // Hết Sắp xếp theo tiêu chí 

    // Phân trang
    const totalTask = await Task.countDocuments(find)
    let objectPagination = paginationHelper(
        {
            currentPage : 1,
            limitItem : 4
        },
        req.query,
        totalTask
    )
    // Hết Phân trang

    // Tìm kiếm 
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }
    // Hết Tìm kiếm 

    const tasks = await Task.find(find)
                            .sort(sort)
                            .limit(objectPagination.limitItem)
                            .skip(objectPagination.skip);
    res.json(tasks)
}
// {{BASE_URL}}/api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted : false
    })
    res.json(task)
}
// {{BASE_URL}}/api/v1/tasks/change-status/:status/:id
export const changeStatus = async(req: Request, res: Response) => {
    const newStatus = req.params.status;
    const id = req.params.id;

    await Task.updateOne(
        {_id : id},
        {status : newStatus}
    )
    res.json({
        code : 200,
        message : "Cập nhật trạng thái thành công"
    })
}
// {{BASE_URL}}/api/v1/tasks/change-multi
export const changeMulti = async (req: Request, res: Response) => {
    try {
        const {ids, key, value} = req.body;
        switch (key) {
            case "status":
                await Task.updateMany(
                    {_id : {$in : ids}},
                    {$set : {
                        status : value
                    }}
                )
                res.json({
                    code : 200,
                    message : "Cập nhật thành công"
                })
                break;
        
            default:
                break;
        }
    } catch (error) {
        res.json({
            code : 400,
            message : "Lỗi"
        })
    }
}

// {{BASE_URL}}/api/v1/tasks/create
export const create = async (req: Request, res: Response) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json({
            code : 200,
            message : "Tạo mới thành công",
            task : task
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Lỗi"
        })
    }
}

// {{BASE_URL}}/api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await Task.updateOne(
            {_id : id},
            req.body
        )
        res.json({
            code : 200,
            message : "Sửa thành công"
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Lỗi"
        })
    }
}