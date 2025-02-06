import { Router } from "express"
import { logoutController, registerUserController } from "../controllers/user.controller.js"
import { verifyEmailController, loginController } from "../controllers/user.controller.js"
import auth from '../middleware/auth.js'

const userRouter = Router()
userRouter.post('/register', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout'
































    , logoutController)
export default userRouter