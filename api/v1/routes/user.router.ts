import { Router } from "express"
const router = Router()

import * as controller from "../controllers/user.controllers"
import * as  authMiddleware from "../middlewares/auth.middleware"

router.post('/register', controller.register)

router.post('/login', controller.login)

// router.post('/password/forgot', controller.forgotPassword)

// router.post('/password/otp', controller.otpPassword)

// router.post('/password/reset', controller.resetPassword)

router.get('/detail', authMiddleware.requireAuth, controller.detail)

// router.get('/list', middlewareAuth.requireAuth, controller.list)


export const userRouter = router