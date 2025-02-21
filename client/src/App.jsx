import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

import Footer from "./components/Footer";
function App() {
  console.log("App component rendered");
  return (
    <div>
      <h1>App Component</h1>
      <Outlet />
    </div>
  );
}

export default App;
