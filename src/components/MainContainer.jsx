import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
  return (
    <div className="d-flex align-items-start">
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainContainer;
