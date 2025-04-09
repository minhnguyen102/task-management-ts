import { Router, Request, Response } from "express"
const router: Router = Router()
import * as controller from "../controllers/task.controllers"

router.get('/', controller.index)

router.get('/detail/:id', controller.detail)

router.patch('/change-status/:status/:id', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)

router.post('/create', controller.create)

export const TasksRouter = router