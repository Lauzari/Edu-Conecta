import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isTokenValid } from "../service/auth/userContext/auth.helpers";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Protected = () => {
  const { token, isLoggingOut, isReady } = useAuth();

  const tokenIsValid = isTokenValid(token);

   if (!isReady) {
    return null;
  }

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
