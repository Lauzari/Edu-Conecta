import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CoursesView.css";

function CoursesView() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:7018/api/courses"); 
       

        if (!response.ok) {
          throw new Error("Error al obtener los cursos");
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  
  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((c) => c.year === filter);

  
  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p>Error: {error}</p>;courses.filter((c) => c.year === filter);

  return (
    <section className="courses-view">
      <div className="container">
        <div className="row">
           <div className="col-lg-12">
            <div className="section-heading">
              <h2>Algunos de nuestros cursos</h2>
            </div>
            </div>
          {/* Sidebar  */}
          <div className="col-lg-4 col-md-12">
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
                <button onClick={() => navigate("/all-courses")}>
                  Todos los cursos
                </button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="col-lg-8 col-md-12">
            <div className="row">
              {filteredCourses.map((course) => (
                <div key={course.id} className="col-lg-6 col-md-6 col-sm-12">
                  <div
                    className="meeting-item"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    <div className="thumb">
                      <img src={course.img} alt={course.title} />
                      <div className="year">
                        <span>
                          {course.year === "primer" ? "1° Año" : "2° Año"}
                        </span>
                      </div>
                    </div>
                    <div className="down-content">
                      <h4 className="course-title-link">{course.title}</h4>
                      <p>
                        <strong>Docente :</strong> {course.professor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoursesView;
