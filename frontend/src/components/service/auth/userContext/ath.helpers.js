import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

// Importa el contexto de autenticación previamente definido
import { UserContext } from "../auth.context";

// Importamos helper que nos ayuda a validar el token
import { isTokenValid } from "./auth.helpers";

// Obtiene el token del localStorage si ya existe y lo valida
const storedToken = localStorage.getItem("dory-shoes-token");
const tokenValue = isTokenValid(storedToken) ? storedToken : null;

// Provider: define y exporta el proveedor del contexto del usuario
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);
  const decodedToken = token ? jwtDecode(token) : null;
  const [role, setRole] = useState(decodedToken?.role || null);
  const [id, setId] = useState(decodedToken?.id || null);

  // Guarda el token y actualiza el estado
  const handleLogin = (token) => {
  localStorage.setItem("dory-shoes-token", token);
  const decodedToken = isTokenValid(token) ? jwtDecode(token) : null;

  if (decodedToken) {
    setRole(decodedToken.role);
    setId(decodedToken.id);
    setToken(token);
  } else {
    handleLogout(); // opcional, por si el token es inválido
  }
};

  // Elimina el token y actualiza el estado
  const handleLogout = () => {
    localStorage.removeItem("dory-shoes-token");
    setToken(null);
    setRole(null);
    setId(null);
  };

  return (
    <UserContext.Provider
      value={{ token, role, id, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};


