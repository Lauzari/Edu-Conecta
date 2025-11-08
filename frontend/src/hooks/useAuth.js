import { useContext } from "react";
import { UserContext } from "../components/service/auth/authContext";

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => {
  const context = useContext(UserContext);

  // Asegurarse de que useAuth se use dentro del UserProvider
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un UserProvider");
  }

  //Valida que el usuario haya iniciado sesión correctamente
  const isAuthenticated = !!context.token;

  return {
    ...context,
    isAuthenticated,
  };
};