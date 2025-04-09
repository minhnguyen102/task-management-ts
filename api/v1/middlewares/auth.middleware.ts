import { User } from "../models/user.model";
import { Request, Response, NextFunction } from "express";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) =>{
    if(req.headers.authorization){
        const tokenUser = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({
            tokenUser : tokenUser,
            deleted : false
        }).select("-password -tokenUser")

        if(!user){
            res.json({
                code : 400,
                message : "TokenUser không hợp lệ"
            })
            return;
        }
        req["user"] = user
        next();
    }else{
        res.json({
            code : 400,
            message : "Vui lòng gửi kèm token"
        })
        return;
    }
}