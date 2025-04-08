import { TasksRouter } from "./taks.router"
import { Express } from "express"

const RouterV1 = (app: Express) => {
    const apiVersion = "/api/v1"

    app.use(apiVersion + "/tasks", TasksRouter)
    
}

export default RouterV1;