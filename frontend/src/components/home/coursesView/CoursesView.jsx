import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CoursesView.css";
import { useAuth } from "../../../hooks/useAuth.js";

function CoursesView() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const apiUrl = import.meta.env.VITE_API_URL;

  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const shiftMap = {
    Morning: "Mañana",
    Afternoon: "Tarde",
    Evening: "Noche",
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${apiUrl}/Class`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, [token]);

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((c) => c.subject.year === (filter === "primer" ? 1 : 2));

  // It shuffles the available courses and only shows four
  const shuffledCourses = [...filteredCourses].sort(() => 0.5 - Math.random());
  const coursesToShow = shuffledCourses.slice(0, 4);


  return (
    <section className="courses-view">
      <div className="container">
        <div className="row">
          {/* Heading */}
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Algunos de nuestros cursos</h2>
            </div>
          </div>

          {/* Sidebar */}
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
              {coursesToShow.map((course) => (
                <div key={course.classId} className="col-lg-6 col-md-6 col-sm-12">
                  <div
                    className="meeting-item"
                    onClick={() => navigate(`/courses/${course.classId}`)}
                  >
                    <div className="thumb">
                      <img
                        src={`/images/subjects/${course.subjectId || "/images/subjects/default"}.jpg`}
                        alt={course.subject.name}
                      />
                      <div className="year">
                        <span>
                          {course.subject.year === 1 ? "1° Año" : "2° Año"}
                        </span>
                      </div>
                    </div>
                    <div className="down-content">
                      <h4 className="course-title-link">{course.subject.name}</h4>
                      <p>
                        <strong>Docente:</strong> {course.teacher.name}
                      </p>
                      <p>
                        <strong>Turno:</strong> {shiftMap[course.classShift]}
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
