import UserModel from "../models/user.model.js";
import sendEmail from "../config/send.email.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import generatedRefreshToken from "../utils/generateRefreshToken.js";
import generatedAccessToken from '../utils/generatedAccessToken.js'
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'
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
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
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

        const accesstoken = await generatedAccessToken(user._id)
        const refreshToken = await generatedRefreshToken(user._id)

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            last_login_date: new Date()
        })

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.cookie('accessToken', accesstoken, cookiesOption)
        response.cookie('refreshToken', refreshToken, cookiesOption)

        return response.json({
            message: "Login successfully",
            error: false,
            success: true,
            data: {
                accesstoken,
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

// upload image controller
export async function uploadAvatarController(req, res) {
    try {
        const userId = req.userId
        const image = req.file
        if (!image) {
            return res.json({
                message: "provide image",
                error: true,
                success: false
            })
        }
        const upload = await uploadImageCloudinary(image)
        const updateUser = await UserModel.findByIdAndUpdate(
            userId, {
            avatar: upload.url
        }
        )
        return res.json({
            message: "profile updated successfully",
            error: false,
            success: true,
            data: {
                _id: userId,
                avatar: upload.url
            }
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
// update details controller
export async function updateDetailsController(req, res) {
    const userId = req.userId //middleware
    try {
        const { name, email, mobile, password } = req.body
        if (!name && !email && !mobile && !password) { // Check if at least one field is provided
            return res.json({
                message: "At least one field must be provided to update",
                error: true,
                success: false
            })
        }

        // Hash the password if provided
        let hashedPassword;
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashedPassword = await bcryptjs.hash(password, salt);
        }

        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            ...(name && { name }), // Update name if provided
            ...(email && { email }), // Update email if provided
            ...(mobile && { mobile: mobile }), // Update phone if provided
            ...(hashedPassword && { password: hashedPassword }) // Update password if provided
        }, { new: true });

        if (!updateUser) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        return res.json({
            message: "details updated successfully",
            error: false,
            success: true,
            data: {
                name: updateUser.name,
                email: updateUser.email,
                phone: updateUser.mobile
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "something went wrong",
            error: true,
            success: false
        });
    }
}
// forget password controller
export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({
                message: "provide email",
                error: true,
                success: false
            });
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({
                message: "user not found",
                error: true,
                success: false
            });
        }
        const otp = generateOtp();
        const expireTime = new Date() + 60 * 60 * 1000 // 1hr
        // Set to 1 hour from now

        await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString() // Store as Date object
        });

        await sendEmail({
            sendTo: email,
            subject: "Forgot password for Blinkit-clone",
            html: forgotPasswordTemplate(user.name, otp)
        });


        return res.json({
            message: "OTP sent successfully",
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

// verify OTP controller
export async function verifyOtpController(req, res) {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                message: "provide email and OTP",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const currentTime = new Date().toISOString()
        const expiryTime = user.forgot_password_expiry; // Use the Date object directly

        if (expiryTime < currentTime) {
            return res.json({
                message: "OTP expired",
                error: true,
                success: false
            });
        }
        if (user.forgot_password_otp !== otp) {
            return res.json({
                message: "OTP not matched",
                error: true,
                success: false
            });
        }

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            forgot_password_otp: "",
            forgot_password_expiry: ""
        })

        // OTP is verified successfully
        return res.json({
            message: "OTP verified successfully",
            error: false,
            success: true
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
//reset the password
export async function resetpassword(request, response) {
    try {
        const { email, newPassword, confirmPassword } = request.body

        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "provide required fields email, newPassword, confirmPassword"
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "newPassword and confirmPassword must be same.",
                error: true,
                success: false,
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword, salt)

        const update = await UserModel.findOneAndUpdate(user._id, {
            password: hashPassword
        })

        return response.json({
            message: "Password updated successfully.",
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

//refresh token controler
export async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]  /// [ Bearer token]

        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            })
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN)

        if (!verifyToken) {
            return response.status(401).json({
                message: "token is expired",
                error: true,
                success: false
            })
        }

        const userId = verifyToken?._id

        const newAccessToken = await generatedAccessToken(userId)

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.cookie('accessToken', newAccessToken, cookiesOption)

        return response.json({
            message: "New Access token generated",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
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

//get login user details
export async function userDetails(request, response) {
    try {
        const userId = request.userId

        console.log(userId)

        const user = await UserModel.findById(userId).select('-password -refresh_token')

        return response.json({
            message: 'user details',
            data: user,
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        })
    }
}
