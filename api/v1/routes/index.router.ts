import { TasksRouter } from "./taks.router"
import { userRouter } from "./user.router"
import { Express } from "express"

import * as  authMiddleware from "../middlewares/auth.middleware"

const RouterV1 = (app: Express) => {
    const apiVersion = "/api/v1"

    app.use(apiVersion + "/tasks", authMiddleware.requireAuth, TasksRouter)

    app.use(apiVersion + "/users", userRouter)
    
}

export default RouterV1;