import { Outlet } from "react-router-dom";

import React from "react";
import Navbar from "../containers/navbar/Navbar";

const Layout = () => {
  return (
    <main>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </main>
  );
};

export default Layout;
