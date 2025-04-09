"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const user_model_1 = require("../models/user.model");
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization) {
        const tokenUser = req.headers.authorization.split(" ")[1];
        const user = yield user_model_1.User.findOne({
            tokenUser: tokenUser,
            deleted: false
        }).select("-password -tokenUser");
        if (!user) {
            res.json({
                code: 400,
                message: "TokenUser không hợp lệ"
            });
            return;
        }
        req["user"] = user;
        next();
    }
    else {
        res.json({
            code: 400,
            message: "Vui lòng gửi kèm token"
        });
        return;
    }
});
exports.requireAuth = requireAuth;
