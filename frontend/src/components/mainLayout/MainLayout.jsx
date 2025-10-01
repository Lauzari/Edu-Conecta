import React, { useState } from "react";
import Header from "./header/Header.jsx";
import LoggedHeader from "./loggedHeader/LoggedHeader.jsx";
import Footer from "./footer/Footer.jsx";
import { Outlet } from "react-router-dom";

function MainLayout() {
  //This will come from the context
  const isLogged = true;

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      {/* It changes the header based on if the user is logged or not */}
      {isLogged ? <LoggedHeader /> : <Header />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
