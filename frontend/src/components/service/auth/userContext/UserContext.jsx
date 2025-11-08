import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../authContext";
import { isTokenValid } from "./auth.helpers";

const storedToken = localStorage.getItem("educonecta-token");
const tokenValue = isTokenValid(storedToken) ? storedToken : null;

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);
  const decodedToken = token ? jwtDecode(token) : null;
  const [role, setRole] = useState(decodedToken?.role || null);
  const [userId, setUserId] = useState(decodedToken?.sub || null);
  const [name, setName] = useState(decodedToken?.name || null);

  const handleLogin = (token) => {
  localStorage.setItem("educonecta-token", token);
  const decodedToken = isTokenValid(token) ? jwtDecode(token) : null;

  if (decodedToken) {
    setRole(decodedToken.role);
    setUserId(decodedToken.id);
    setToken(token);
    setName(decodedToken.name);
  } else {
    handleLogout();
  }
};

  const handleLogout = () => {
    localStorage.removeItem("educonecta-token");
    setToken(null);
    setRole(null);
    setUserId(null);
    setName(null);
  };

  return (
    <UserContext.Provider
      value={{ token, role, userId, name, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};


