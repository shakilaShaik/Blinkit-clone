import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { logout } from "../store/UserSlice";
import AxiosToastError from "../utils/AxiosToastError";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div>
      <div className="font-semibold"> My Account</div>

      <div className="text-sm">
        {user.name || user.mobile}

        <Link></Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-1">
        <Link to={""} className="px-2 hover:bg-orange-200">
          My Orders
        </Link>
        <Link to={""} className="px-2 hover:bg-orange-200">
          {" "}
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left hover:bg-orange-200 px-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
