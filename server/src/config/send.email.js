import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

// Create transporter with Gmail SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail service directly instead of custom host/port
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send an email
const sendEmail = async ({ sendTo, subject, html }) => {


    try {
        const info = await transporter.sendMail({
            from: `"Blinkit-clone" ${process.env.EMAIL_USER}`,
            to: sendTo,
            subject: subject,
            html: html
        });
        return info;
    } catch (error) {

        throw error;
    }
};

export default sendEmail;
