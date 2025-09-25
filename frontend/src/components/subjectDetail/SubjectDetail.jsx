import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import subjects from "../../data/subjects.js";

function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const subject = subjects.find((s) => s.id === parseInt(id));

     useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!subject) {
    return <p>Materia no encontrada</p>;
  }

  return (
    <section className="section main-banner" id="subject-detail" data-section="section-detail">
      {/* Video de fondo igual que el banner */}
      <video autoPlay muted loop id="bg-video">
        <source src="/images/course-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay de la plantilla */}
      <div className="video-overlay header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="caption">
                <h2>{subject.title}</h2>

                <h6 style={{ marginTop: "10px" }}>📅 Fecha de inicio: {subject.date}</h6>

                <p>{subject.description}</p>

                {/* Botón de inscripción */}
                <div className="main-button-red" style={{ marginTop: "20px" }}>
                  <div className="scroll-to-section">
                    <button onClick={() => navigate(`/inscripcion/${subject.id}`)}>
                      Inscripcion
                    </button>
                  </div>
                </div>

                {/* Botón volver */}
                <div className="main-button-red" style={{ marginTop: "15px" }}>
                  <div className="scroll-to-section">
                    <button onClick={() => navigate(-1)}>Volver</button>
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

export default SubjectDetail;
