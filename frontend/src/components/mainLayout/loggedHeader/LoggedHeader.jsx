import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../header/Header.css";
import "./LoggedHeader.css";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";

function LoggedHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { role, name, handleLogout } = useAuth();

  const userInitial = name ? name.charAt(0).toUpperCase() : "?";

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // if we go over 80px down, we activate the sticky menu
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleUserLogOut = () => {
    handleLogout();
    toast.info("Ha cerrado sesión.");
    setMenuOpen(false)
    navigate("/");
  };
  return (
    <header className={`header-area ${isSticky ? "header-sticky" : ""}`}>
      <div className="container">
        <div className="row">
            <nav className="main-nav">
              <button
                className="logo"
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
              >
                EduConecta
              </button>
              <ul className={`nav ${menuOpen ? "active" : ""}`}>
                <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/");
                      setMenuOpen(false);
                    }}
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/courses");
                      setMenuOpen(false);
                    }}
                  >
                    Cursos
                  </button>
                </li>
                {role == "Admin" ? <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/dashboard");
                      setMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </button>
                </li> : <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/my-courses");
                      setMenuOpen(false);
                    }}
                  >
                    Mis cursos
                  </button>
                </li>}

                {role == "Student" ? <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/form-professor");
                      setMenuOpen(false);
                    }}
                  >
                    Profesores
                  </button>
                </li> : ""}

                <li>
                  <button
                    className="nav-link"
                    onClick={handleUserLogOut}
                  >
                    Cerrar sesión
                  </button>
                </li>
                {menuOpen ? (
                  <li>
                    <button
                      className="nav-link"
                      onClick={() => {
                        navigate("/user-profile");
                        setMenuOpen(false);
                      }}
                    >
                      Mi perfil
                    </button>
                  </li>
                ) : (
                  <button onClick={() => {
                        navigate("/user-profile");
                        setMenuOpen(false);
                      }} className="user-avatar">{userInitial}</button>
                )}
              </ul>

              <button
                className={`menu-trigger ${menuOpen ? "active" : ""}`}
                onClick={toggleMenu}
              >
                <span></span>
              </button>
            </nav>
          </div>
        </div>
    </header>
  );
}

export default LoggedHeader;
