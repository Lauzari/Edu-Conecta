import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


//FALTA AGREGAR:
// - Cambio cuando el usuario tenga la sesión iniciada
//      - Avatar de usuario
//      - Desplegable cuando se apriete (Mi perfil y Cerrar Sesión)
function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // si bajamos más de 80px, activamos sticky
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup para evitar fugas de memoria
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
                  navigate("/home");
                  setMenuOpen(false);
                }}
              >
                EduConecta
              </button>
              <ul className={`nav ${menuOpen ? "active" : ""}`}>
                <li className="scroll-to-section">
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/home");
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
                <li className="scroll-to-section">
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/teachers");
                      setMenuOpen(false);
                    }}
                  >
                    Docentes
                  </button>
                </li>
                <li className="has-sub">
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/faq");
                      setMenuOpen(false);
                    }}
                  >
                    Preguntas Frecuentes
                  </button>
                  {/* <ul className="sub-menu">
                    <li>
                      <button
                        onClick={() => {
                          navigate("/meetings");
                          setMenuOpen(false);
                        }}
                      >
                        Upcoming Meetings
                      </button>
                    </li>
                    <li>
                      <button
                        className="nav-link"
                        onClick={() => {
                          navigate("/meetings");
                          setMenuOpen(false);
                        }}
                      >
                        Meeting Details
                      </button>
                    </li>
                  </ul> */}
                </li>
                {/* <li >
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/meetings");
                      setMenuOpen(false);
                    }}
                  >
                    Courses
                  </button>
                </li> */}
                <li className="scroll-to-section">
                  <button
                    className="nav-link"
                    onClick={() => {
                      navigate("/contact");
                      setMenuOpen(false);
                    }}
                  >
                    Contacto
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
      </div>
    </header>
  );
}

export default Header;
