import React, { useEffect } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import fetchUserDetails from "./utils/FetchUserDetails";

function App() {
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    console.log(userData, "user data");
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
