import { Router } from "express"
import { forgotPasswordController, logoutController, registerUserController, resetpassword, updateDetailsController, uploadAvatarController, verifyOtpController } from "../controllers/user.controller.js"
import { verifyEmailController, loginController, userDetails, refreshToken } from "../controllers/user.controller.js"
import auth from '../middleware/auth.js'
import upload from "../middleware/multer.js"


const userRouter = Router()
userRouter.post('/register', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout', auth, logoutController)
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatarController)
userRouter.put('/update-details', auth, updateDetailsController)
userRouter.put('/forgot-password', forgotPasswordController)
userRouter.put('/verify-otp', verifyOtpController)
userRouter.put('/reset-password', resetpassword)
userRouter.get('/user-details', auth, userDetails)
userRouter.post('/refresh-token', refreshToken)
export default userRouter