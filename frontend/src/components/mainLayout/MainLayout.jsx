import React from "react";
import SubHeader from "./subHeader/SubHeader.jsx";
import Header from "./header/Header.jsx";
import Footer from "./footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <SubHeader />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
