import React from "react";
import { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import courses from "../../data/courses.js";
import users from "../../data/user.js";
import "./CourseDetail.css";
import StudientModal from "../ui/studientModal/StudientModal.jsx";
import EditClassModal from "../ui/EditClass/EditClassMOdal.jsx";


function CourseDetail() {
  // tipo de usuario actual, es para testear el modal de edición y de inscriptos
  const currentUser = { role: "professor" };
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0); //scroll to top 
  }, []);

  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <p>Curso no encontrado</p>;
  }

  const hoursFormatted = Array.isArray(course.hours)
    ? course.hours.join(" / ")
    : typeof course.hours === "string"
      ? course.hours.split(",").join(" / ")
      : "Horario no disponible";



  return (
    <div>
      {/* Heading Page */}
      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h6>Detalles del curso</h6>
              <h2>{course.title}</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Course Detail */}
      <section className="meetings-page" id="meetings">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="meeting-single-item mx-auto">
                <div className="thumb">

                  {/* Image */}
                  <img src={course.img} alt={course.title} />
                </div>

                <div className="down-content">
                  <h4>{course.title}</h4>
                  <p className="description">{course.description}</p>

                  {/* Date and hour */}
                  <div className="course-info">
                    <p>
                      <strong>Fecha:</strong>{" "}
                      {course.startDate && course.endDate
                        ? `${new Date(course.startDate).toLocaleDateString("es-ES", { month: "short" })} ${new Date(course.startDate).getDate()} - ${new Date(course.endDate).toLocaleDateString("es-ES", { month: "short" })} ${new Date(course.endDate).getDate()}`
                        : "Fecha no disponible"}
                    </p>
                    <p>
                      <strong>Horario:</strong>{" "}
                      {course.hours ? hoursFormatted : "Horario no disponible"}
                    </p>
                  </div>

                  {/* Professor */}
                  <p><strong>Docente: </strong> {course.professor} </p>

                  {/* Buttons */}
                  <div className="course-buttons mt-4">
                    <button className="main-button-red" onClick={() => navigate("/courses")}>
                      Volver a la lista de cursos
                    </button>

                    <button className="main-button-red">Crear curso</button>
                    {(currentUser.role === "admin" || currentUser.role === "professor") ? (
                      <button className="main-button-red" onClick={() => setShow(true)}>
                        Inscriptos en la materia
                      </button>
                    ) : (
                      <button className="main-button-red">Inscribirme</button>
                    )}

                    {(currentUser.role ==="admin" || currentUser.role === "professor") ? (
                    <button className="main-button-red" onClick={() => setShowEdit(true)}>Editar curso</button>
                    ) : ""}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StudientModal show={show} onHide={() => setShow(false)} />
        <EditClassModal
        show={showEdit}
        onHide={() => setShowEdit(false)}
      />
    </div>
  );
}

export default CourseDetail;
