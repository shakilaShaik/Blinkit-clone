import React from "react";
import "./App.css";

import toast, { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useEffect } from "react";
import { setUserDetails } from "./store/userSlice";
import { useDispatch } from "react-redux";
import SummaryApi from "./common/SummaryApi";
import Axios from "axios";
import { setAllCategory, setLoadingCategory } from "./store/productSlice";
function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };
  useEffect(() => {
    fetchUser();
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      // Check if the response is not OK (status code not in the range 200-299)
      if (!response.status.toString().startsWith("2")) {
        console.error(`HTTP error! status: ${response.status}`);
        return;
      }

      const { data: responseData } = response;
      console.log("response data from fetchCategory", responseData);

      if (responseData.success) {
        dispatch(
          setAllCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      console.log("error from fetchCategory", error);
    } finally {
      dispatch(setLoadingCategory(false));
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
