import React from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import fetchUserDetails from "./utils/FetchUserDetails";
import { useEffect } from "react";
import { setUserDetails } from "./store/UserSlice";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    console.log(userData.data, "user data.data");
    dispatch(setUserDetails(userData.data));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Header />
      <main className="min-h-[85vh] ">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
