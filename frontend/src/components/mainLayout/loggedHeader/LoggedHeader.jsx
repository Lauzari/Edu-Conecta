import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../header/Header.css";
import "./LoggedHeader.css";

function LoggedHeader() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  //This would come from the context
  const user = { name: "Justina Rey" };
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "?";

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
  return (
    <header className={`header-area ${isSticky ? "header-sticky" : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
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
                <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/register");
                      setMenuOpen(false);
                    }}
                  >
                    Mis cursos
                  </button>
                </li>

                <li className="has-sub">
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/applyNow");
                      setMenuOpen(false);
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
                {menuOpen ? (
                  <li className="has-sub">
                    <button
                      className="nav-link"
                      onClick={() => {
                        navigate("/myProfile");
                        setMenuOpen(false);
                      }}
                    >
                      Mi perfil
                    </button>
                  </li>
                ) : (
                  <li className="user-avatar">{userInitial}</li>
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
      </div>
    </header>
  );
}

export default LoggedHeader;
