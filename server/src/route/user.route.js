import { Router } from "express"
import { forgotPasswordController, logoutController, registerUserController, updateDetailsController, uploadAvatar, verifyOtpController } from "../controllers/user.controller.js"
import { verifyEmailController, loginController } from "../controllers/user.controller.js"
import auth from '../middleware/auth.js'
import upload from "../middleware/multer.js"


const userRouter = Router()
userRouter.post('/register', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout', auth, logoutController)
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)
userRouter.put('/update-details', auth, updateDetailsController)
userRouter.put('/forgot-password', forgotPasswordController)
userRouter.put('/verify-otp', verifyOtpController)
export default userRouter