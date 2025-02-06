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
    console.log('Email configuration:', {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        // Don't log the actual password
        hasPassword: !!process.env.EMAIL_PASS
    });

    console.log(`Sending email to: ${sendTo}, Subject: ${subject}`);
    try {
        const info = await transporter.sendMail({
            from: `"Blinkit-clone" ${process.env.EMAIL_USER}`,
            to: sendTo,
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
