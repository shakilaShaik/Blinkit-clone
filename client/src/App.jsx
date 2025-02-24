import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
