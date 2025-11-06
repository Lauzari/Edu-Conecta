import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import LoginModal from "../loginModal/LoginModal.jsx";

const PrivateRoute = ({ allowedRoles }) => {
  const { role } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (!role) {
    return (
      <>
        <LoginModal show={true} handleClose={() => setShowLogin(false)} />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          Debes iniciar sesión para continuar.
        </div>
      </>
    );
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
