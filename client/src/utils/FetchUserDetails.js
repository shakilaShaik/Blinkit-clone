
import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"
const fetchUserDetails = async () => {
    try {
        const responese = await Axios({
            ...SummaryApi.user_details,
        })
        return responese.data
    }
    catch (error) {
        console.log(error)
    }
}
export default fetchUserDetails