import React from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useEffect } from "react";
import { setUserDetails } from "./store/UserSlice";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
    console.log("user data is", userData.data);
  };
  useEffect(() => {
    fetchUser();
  }, []);
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
