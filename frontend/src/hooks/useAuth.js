import { useContext } from "react";
import { UserContext } from "../components/service/auth/authContext";

export const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un UserProvider");
  }

  const isAuthenticated = !!context.token;

  return {
    ...context,
    isAuthenticated,
  };
};