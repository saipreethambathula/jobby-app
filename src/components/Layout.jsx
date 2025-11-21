import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="min-h-screen bg-[#121212] h-full flex flex-col">
      <Header />
      <div className="h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
