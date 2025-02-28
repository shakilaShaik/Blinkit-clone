export const baseURL = "http://localhost:7000";
const SummaryApi = {
    register: {
        url: "/api/user/register",
        method: "post"
    },
    login: {
        url: "/api/user/login",
        method: "post"
    }
}

export default SummaryApi