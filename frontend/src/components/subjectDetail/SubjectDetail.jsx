import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SubjectDetail.css";


function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
   
    const fetchSubject = async () => {
      try {
        
        const response = await fetch(`${apiUrl}/api/subjects/${id}`);

        if (!response.ok) {
          throw new Error("Error al obtener la materia");
        }

        const data = await response.json();

       
        setSubject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0); 
      }
    };

    fetchSubject();
  }, [id]); 


  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!subject) return <p>Materia no encontrada</p>;

     useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!subject) {
    return <p>Materia no encontrada</p>;
  }

  return (
    <section className="section main-banner" id="subject-detail" data-section="section-detail">
     
      <video autoPlay muted loop id="bg-video">
        <source src="/images/course-video.mp4" type="video/mp4" />
      </video>

      
      <div className="video-overlay header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="caption">
                <h2>{subject.title}</h2>

                

                <p>{subject.description}</p>

               
                <div className="main-button-red" style={{ marginTop: "20px" }}>
                  <div className="scroll-to-section">
                    <button onClick={() => navigate(`/inscripcion/${subject.id}`)}>
                      Cursos disponibles para esta materia
                    </button>
                  </div>
                </div>

               
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
