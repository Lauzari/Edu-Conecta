import React from "react";
import { useState } from "react";
import "./ApplyNow.css";
import { Link, useNavigate } from "react-router-dom";

function ApplyNow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
      const navigate = useNavigate(); 
  };

  const items = [
    {
      title: "¿Qué es EduConecta?",
      content: (
        <p>
          <strong>EduConecta</strong> es una plataforma creada especialmente
          para acompañar a los estudiantes de la{" "}
          <b>Tecnicatura Universitaria en Programación de la UTN</b>. Nuestro
          objetivo es ofrecer un espacio de apoyo académico donde podés reforzar
          tus conocimientos, resolver dudas y compartir experiencias con otros
          compañeros.
        </p>
      ),
    },
    {
      title: "¿Es necesario pagar para acceder a las clases?",
      content: (
        <p>
          ¡Para nada! El acceso a las clases de <strong>EduConecta</strong> es
          totalmente gratuito. Creemos que la educación debe ser inclusiva y
          accesible para todos. De todas formas, si querés apoyar este proyecto
          y ayudar a que siga creciendo, podés invitarnos un <Link to={"https://cafecito.app/"}>cafecito</Link>.
          Ese pequeño gesto nos permite seguir ofreciendo más contenidos y
          mantener la plataforma en marcha.
        </p>
      ),
    },
    {
      title: "¿Cuántos estudiantes se permiten por clase?",
      content: (
        <p>
          Cada clase está diseñada para un máximo de{" "}
          <strong>15 estudiantes</strong>. De esta manera nos aseguramos de que
          todos tengan la posibilidad de participar, hacer preguntas y recibir
          la atención necesaria. La idea es mantener un ambiente cercano y
          personalizado, donde cada voz pueda ser escuchada.
        </p>
      ),
    },
    {
      title: "¿Cómo puedo ver las clases?",
      content: (
        <p>
          Una vez que te inscribas, recibirás en tu correo electrónico un
          <strong> enlace de Zoom</strong> exclusivo para cada clase. Solo tenés
          que hacer clic en el link el día y horario programados, y listo. ¡Es
          muy simple y podés conectarte desde tu computadora, tablet o incluso
          tu celular!
        </p>
      ),
    },
  ];

  return (
    <section className="apply-now" id="apply">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="row">
              <div className="col-lg-12">
                <div className="item">
                  <h3>REGISTRATE COMO ESTUDIANTE</h3>
                  <p>
                    Si quieres disfrutar de forma gratuita de todas nuestras
                    clases, ¡no pierdas más tiempo! Únete a esta hermosa
                    comunidad que le ofrece a sus alumnos clases de apoyo de la
                    mejor calidad para mejorar sus experiencia académica.
                  </p>
                  <div className="main-button-blue">
                    <div className="scroll-to-section">
                      <button onClick={() => navigate("/register")}>
                        Regístrate ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="item">
                  <h3>REGISTRATE COMO DOCENTE</h3>
                  <p>
                    Para poder formar parte de nuestro cuerpo docente, primero
                    debes crear una cuenta como estudiante y luego rellenar el
                    formulario que aparece en la sección "Profesores" para que
                    nuestro comité verifique tu perfil.
                  </p>
                  <div className="main-button-green">
                    <div className="scroll-to-section">
                      <button onClick={() => navigate("/register")}>
                        Regístrate ahora
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="accordions is-first-expanded">
              {items.map((item, index) => (
                <article
                  key={index}
                  className={`accordion ${
                    index === items.length - 1 ? "last-accordion" : ""
                  } ${activeIndex === index ? "active" : ""}`}
                >
                  <div
                    className="accordion-head"
                    onClick={() => toggleAccordion(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{item.title}</span>
                    <span className="icon">
                      <i
                        className={`icon fa ${
                          activeIndex === index
                            ? "fa-chevron-down"
                            : "fa-chevron-right"
                        }`}
                      ></i>
                    </span>
                  </div>
                  {activeIndex === index && (
                    <div className="accordion-body">
                      <div className="content">{item.content}</div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplyNow;