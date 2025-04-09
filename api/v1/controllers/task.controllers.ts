import Task from "../models/task.model"
import { Request, Response } from "express"
import { paginationHelper } from "../../../helpers/pagination"
import searchHelper from "../../../helpers/search"

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

export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted : false
    })
    res.json(task)
}