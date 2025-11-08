import React, { useState } from "react";
import Header from "./header/Header.jsx";
import LoggedHeader from "./loggedHeader/LoggedHeader.jsx";
import Footer from "./footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";

function MainLayout() {
  //This will come from the context
  const { token } = useAuth();

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      {/* It changes the header based on if there is a token in Local Storage or not */}
      {token ? <LoggedHeader /> : <Header />}
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
