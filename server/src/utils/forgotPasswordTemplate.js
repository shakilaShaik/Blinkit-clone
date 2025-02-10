const forgotPasswordTemplate = (name, otp) => {
    return `
    <div>
        <h1>Hello ${name},</h1>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 1 hour.</p>
    </div>
    `;
};

export default forgotPasswordTemplate;