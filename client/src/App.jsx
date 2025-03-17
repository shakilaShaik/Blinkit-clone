import React from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useEffect } from "react";
import { setUserDetails } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "./common/SummaryApi";
import Axios from "./utils/Axios";
import { setAllCategory, setAllSubCategory } from "./store/productSlice";
function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    console.log("user data is", userData);
    dispatch(setUserDetails(userData.data));
  };
  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);
  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      console.log("response data is", responseData);
      dispatch(setAllCategory(responseData.data));
    } catch (error) {
      console.error("Error fetching category:", error);
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
      }
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllSubCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
    } finally {
    }
  };
  return (
    <>
      <Header />
      <main className="min-h-[78vh]  ">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
