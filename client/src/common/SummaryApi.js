export const baseURL = "http://localhost:7000";
const SummaryApi = {
    register: {
        url: "/api/user/register",
        method: "post"
    },
    login: {
        url: "/api/user/login",
        method: "post"
    },
    forgot_password: {
        url: "/api/user/forgot-password",
        method: "put"
    },
    otp_verification: {
        url: "/api/user/verify-otp",
        method: "put"
    },

    reset_password: {
        url: "/api/user/reset-password",
        method: "put"

    },
    refresh_token: {
        url: "/api/user/refresh-token",
        method: "post"
    },
    user_details: {
        url: "/api/user/user-details",
        method: "get"
    }
}

export default SummaryApi