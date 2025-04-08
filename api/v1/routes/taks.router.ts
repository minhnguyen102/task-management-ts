import { Router, Request, Response } from "express"
const router: Router = Router()
import * as controller from "../controllers/task.controllers"

router.get('/', controller.index)

router.get('/detail/:id', controller.detail)

export const TasksRouter = router