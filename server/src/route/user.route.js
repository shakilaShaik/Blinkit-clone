import { Router } from "express"
import { logoutController, registerUserController, uploadAvatar } from "../controllers/user.controller.js"
import { verifyEmailController, loginController } from "../controllers/user.controller.js"
import auth from '../middleware/auth.js'
import upload from "../middleware/multer.js"


const userRouter = Router()
userRouter.post('/register', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout', auth, logoutController)
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)
export default userRouter