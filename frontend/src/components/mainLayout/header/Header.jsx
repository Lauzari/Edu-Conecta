import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
                  onClick={() => {
                    navigate("/applyNow");
                    setMenuOpen(false);
                  }}
                >
                  Preguntas Frecuentes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/contact");
                    setMenuOpen(false);
                  }}
                >
                  Contacto
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                >
                  Registro
                </button>
              </li>
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

export default Header;
