import { useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../authContext";
import { isTokenValid } from "./auth.helpers";

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("educonecta-token");

    if (isTokenValid(storedToken)) {
      const decodedToken = jwtDecode(storedToken);
      setToken(storedToken);
      setRole(decodedToken.role);
      setUserId(decodedToken.sub || decodedToken.id);
      setName(decodedToken.name);
    }

    setIsReady(true);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("educonecta-token", token);
    const decodedToken = isTokenValid(token) ? jwtDecode(token) : null;

    if (decodedToken) {
      setRole(decodedToken.role);
      setUserId(decodedToken.sub || decodedToken.id);
      setToken(token);
      setName(decodedToken.name);
    } else {
      handleLogout();
    }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("educonecta-token");
    setToken(null);
    setRole(null);
    setUserId(null);
    setName(null);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        role,
        userId,
        name,
        isReady,
        handleLogin,
        handleLogout,
        isLoggingOut
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
