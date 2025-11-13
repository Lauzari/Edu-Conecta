import React, { useEffect, useState } from "react";
import "./OurFacts.css";



function OurFacts() {
 /* const [facts, setFacts] = useState({
   
    professors: 0,
    newStudents: 0,
    availableClasses: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const response = await fetch("http://localhost:7018/api/facts");
        

        if (!response.ok) {
          throw new Error("Error al obtener los datos de la institución");
        }

        const data = await response.json();

       
        setFacts({
          professors: data.professors,
          newStudents: data.newStudents,
          availableClasses: data.availableClasses,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFacts();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;
*/
  return (
    <section className="our-facts">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-12">
              <h2>Algunos datos de nuestra institución</h2>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12">
                  <div className="count-area-content percentage">
                    <div className="count-digit">100</div>
                    <div className="count-title">clases virtuales</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="count-area-content">
                    <div className="count-digit">26</div>
                    <div className="count-title">profesores verificados</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12">
                  <div className="count-area-content new-students">
                    <div className="count-digit">345</div>
                    <div className="count-title">estudiantes nuevos</div>
                  </div>
                </div> 
                <div className="col-12">
                  <div className="count-area-content">
                    <div className="count-digit">32</div>
                    <div className="count-title">clases disponibles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div className="col-lg-6 align-self-center">
          <div className="video">
            <a href="https://www.youtube.com/watch?v=HndV87XpkWg" target="_blank"><img src="/images/play-icon.png" alt=""/></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default OurFacts