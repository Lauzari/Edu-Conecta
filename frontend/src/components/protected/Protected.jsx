import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isTokenValid } from "../service/auth/userContext/auth.helpers";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Protected = () => {
  const { token, isLoggingOut } = useAuth();
  const tokenIsValid = isTokenValid(token);

  useEffect(() => {
    if (!tokenIsValid && !isLoggingOut) {
      toast.info("Debes iniciar sesión para continuar", { autoClose: 3000 });
    }
  }, [tokenIsValid, isLoggingOut]);

  if (!tokenIsValid) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default Protected;
