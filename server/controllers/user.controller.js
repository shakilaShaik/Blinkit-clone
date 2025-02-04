import UserModel from "../models/user.model.js";
import sendEmail from "../config/send.email.js";
import bcrypt from "bcryptjs";

import verifyEmailTemplate from "../utils/verifyEmaillTemplate.js";
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
export async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!email) {
            return res.json({
                "message": "user not found",
                error: true,
                success: false
            })
        }
        if (user.status !== "active") {
            return res.json({
                "message": "user is not active",
                error: true,
                success: false
            })
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "incorrect password",
                error: true,
                success: false
            });
        }

    } catch (error) {
        return res.json({
            message: error.message || error,
        })
    }
}