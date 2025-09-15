import React, { use } from "react";
import { useNavigate } from "react-router-dom";

function MainBanner() {
  const navigate = useNavigate();

  return (
    <section className="section main-banner" id="top" data-section="section1">
      <video autoPlay muted loop id="bg-video">
        <source src="/images/course-video.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="caption">
                <h6>¡Hola, Estudiantes!</h6>
                <h2>Bienvenidos a EduConecta</h2>
                <p>
                  Esta es una plataforma pensada con cariño para los estudiantes
                  de la Tecnicatura Universitaria en Programación de la UTN. Aquí podés encontrar clases de
                  apoyo en distintas materias, acompañadas por docentes
                  certificados que conocen a fondo el programa. Nuestro objetivo
                  es que el estudio sea más sencillo, con un enfoque cercano y
                  amigable que te ayude a sentirte acompañado y seguro mientras
                  avanzás en tu carrera.
                </p>
                <div className="main-button-red">
                  <div className="scroll-to-section">
                   <button onClick={() => navigate("/register")}>¡Registrate!</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainBanner;
