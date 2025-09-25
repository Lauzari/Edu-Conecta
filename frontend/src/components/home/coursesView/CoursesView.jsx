import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CoursesView.css";
import courses from "../../../data/courses.js";

function CoursesView() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [modalCourse, setModalCourse] = useState(null);

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((c) => c.year === filter);

  return (
    <section className="courses-view">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Algunos de nuestros cursos</h2>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="categories">
              <h4>¿En qué año de la carrera estás?</h4>
              <ul>
                <li>
                  <button
                    className={filter === "primer" ? "active" : ""}
                    onClick={() => setFilter("primer")}
                  >
                    Primer año
                  </button>
                </li>
                <br />
                <li>
                  <button
                    className={filter === "segundo" ? "active" : ""}
                    onClick={() => setFilter("segundo")}
                  >
                    Segundo año
                  </button>
                </li>
              </ul>

              <div className="main-button-blue">

                <button onClick={() => setFilter("all")}>Todos los cursos</button>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="row">
              {filteredCourses.map((course) => (
                <div key={course.id} className="col-lg-6">
                  <div className="meeting-item fade-up" onClick={() => setModalCourse(course)}>
                    <div className="thumb">
                      <div className="year">
                        <span>{course.year === "primer" ? "1° Año" : "2° Año"}</span>
                      </div>
                      <img src={course.img} alt={course.title} />
                    </div>
                    <div className="down-content">
                      <div className="date">
                        <h6>
                          {course.date.split(" ")[0]} <span>{course.date.split(" ")[1]}</span>
                        </h6>
                      </div>
                      <h4 className="course-title-link" onClick={() => navigate(`/subjects/${course.id}`)}>
                        {course.title}
                      </h4>
                      <p><b>Profesor:</b><br />{course.professor}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        {modalCourse && (
          <div className="ourcourses-modal-overlay" onClick={() => setModalCourse(null)}>
            <div className="ourcourses-modal-content" onClick={(e) => e.stopPropagation()}>
              <h4 className="course-title-link" onClick={() => navigate(`/subjects/${modalCourse.id}`)}>
                {modalCourse.title}
              </h4>
              <p><b>Profesor:</b> {modalCourse.professor}</p>
              <p>Fecha: {modalCourse.date}</p>
              <img src={modalCourse.img} alt={modalCourse.title} style={{ width: "100%", marginTop: "10px" }} />
              <button className="close-btn" onClick={() => setModalCourse(null)}>
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CoursesView;
