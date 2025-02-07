import UserModel from "../models/user.model.js";
import sendEmail from "../config/send.email.js";
import bcryptjs from "bcryptjs";
import generatedRefreshToken from "../utils/generateRefreshToken.js";
import generatedAccessToken from '../utils/generatedAccessToken.js'
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
// import upload from "../middleware/multer.js";
export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "fill all the required fields",
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({ email })

        if (user) {
            return res.json({
                message: "user already exists",
                error: true,
                success: false
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const payload = {
            name,
            email,
            password: hashPassword
        }
        const newUser = new UserModel(payload);
        const save = await newUser.save();
        const verifyEmailUrl = `${process.env.
            FRONTEND_URL}/verify-email?code=${save?._id}`




        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "verify your email for Blinkit-clone",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        })

        return res.json({
            message: "user registered successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}

export async function verifyEmailController(req, res) {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({
                message: "Verification code is required",
                error: true,
                success: false
            });
        }
        const user = await UserModel.findOne({
            _id: code
        });
        if (!user) {
            return res.json({
                message: "user is not verified",
                error: true,
                success: false
            });
        }
        const updateUser = await UserModel.updateOne({
            _id: code
        }, { verify_email: true });
        return res.json({
            message: "verified successfully",
            error: false,
            success: true
        });
    } catch (error) {
        console.error("Error in verifyEmailController:", error);
        return res.status(500).json({
            error: true,
            message: error.message || error,
            success: false
        });
    }
}
//  {Login controller}
//login controller
export async function loginController(request, response) {
    try {
        const { email, password } = request.body


        if (!email || !password) {
            return response.status(400).json({
                message: "provide email, password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "User not register",
                error: true,
                success: false
            })
        }

        // if (user.status !== "Active") {
        //     return response.status(400).json({
        //         message: "Contact to Admin",
        //         error: true,
        //         success: false
        //     })
        // }

        const checkPassword = await bcryptjs.compare(password, user.password)

        if (!checkPassword) {
            return response.status(400).json({
                message: "Check your password",
                error: true,
                success: false
            })
        }

        const accessToken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.cookie('accessToken', accessToken, cookiesOption)
        response.cookie('refreshToken', refreshToken, cookiesOption)

        return response.json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//logout controller
export async function logoutController(request, response) {
    try {
        const userid = request.userId //middleware

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.clearCookie("accessToken", cookiesOption)
        response.clearCookie("refreshToken", cookiesOption)

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        })

        return response.json({
            message: "Logout successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
// // logout controller
// export async function logoutController(req, res) {
//     try {
//         const userid = req.user._id  //middleware
//         const cookiesOption = {
//             httpOnly: true,
//             secure: true,
//             sameSite: "none"

//         }
//         res.clearCookie("accessToken", cookiesOption)
//         res.clearCookie("refreshToken", cookiesOption)
//         const removeRefreshToken = await UserModel.findByIdAndUpdate(
//             userid,
//             {
//                 refresh_token: ""

//             }

//         )
//     }
//     catch (error) {
//         return res.json({
//             message: error.message || error,
//             error: true,
//             success: false
//         })
//     }


// }
// upload image controller
export async function uploadAvatar(req, res) {
    try {
        const image = req.file
        const upload = await uploadImageCloudinary(image)
        return res.json({
            message: "profile updated successfully",
            error: true,
            success: false
        })
    }
    catch (error) {
        return res.json({
            message: error.message || error && "something went wrong",
            error: true,
            success: false
        })

    }
}