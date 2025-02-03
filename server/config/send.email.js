import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();

// Create transporter with SMTP settings
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // Use `true` for port 465, otherwise `false`
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send an email
const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"Blinkit-clone"${process.env.EMAIL_USER}`, // Sender address
            to: sendTo, // Receiver(s)
            subject: subject,
            html: html
        });

        console.log(`Email sent: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw error;
    }
};

export default sendEmail;
