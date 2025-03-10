import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    mobile: null,
    address_details: [],
    createdAt: "",

    last_login_date: "",
    order_history: [],
    role: "",
    shopping_cart: [],
    status: "",

    verify_email: false,

}
const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload?._id
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.avatar = action.payload?.avatar
            state.mobile = action.payload?.mobile
            state.address_details = action.payload?.address_details
            state.createdAt = action.payload?.createdAt
            state.last_login_date = action.payload?.last_login_date
            state.order_history = action.payload?.order_history
            state.role = action.payload?.role
            state.shopping_cart = action.payload?.shopping_cart
            state.status = action.payload?.status
            state.verify_email = action.payload?.verify_email



        },
        updatedAvatar: (state, action) => {
            state.avatar = action.payload
        },
        logout: (state, action) => {
            state._id = ""
            state.name = ""
            state.email = ''
            state.avatar = ''
            state.mobile = ''
            state.address_details = ""
            state.createdAt = ""
            state.last_login_date = ""
            state.order_history = []
            state.role = ""
            state.shopping_cart = []
            state.status = ""
            state.verify_email = ""

        }
    }
})
export const { setUserDetails, logout, updatedAvatar } = userSlice.actions
export default userSlice.reducer