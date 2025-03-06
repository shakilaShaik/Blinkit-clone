
import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"
const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...SummaryApi.user_details,
        })
        console.log("user details are from fetch user details", response.data)
        return response.data

    }
    catch (error) {
        console.log("error from fetch user details", error)
    }
}
export default fetchUserDetails