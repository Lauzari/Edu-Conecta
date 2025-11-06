import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AllCoursesView.css";
import { useAuth } from "../../../hooks/useAuth.js";

function AllCoursesView() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const coursesPerPage = 4;

  const shiftMap = {
    Morning: "Mañana",
    Afternoon: "Tarde",
    Evening: "Noche",
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://localhost:7018/Class", {
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

  // Filtrado por año
  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter(
          (c) => c.subject.year === (filter === "primer" ? 1 : 2)
        );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  if (loading) return <p>Cargando cursos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Heading Page */}
      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Todos nuestros cursos</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="container my-4 text-center">
        <div className="filters">
          <ul>
            <li
              className={filter === "all" ? "active" : ""}
              onClick={() => {
                setFilter("all");
                setCurrentPage(1);
              }}
            >
              Todos
            </li>
            <li
              className={filter === "primer" ? "active" : ""}
              onClick={() => {
                setFilter("primer");
                setCurrentPage(1);
              }}
            >
              Primer Año
            </li>
            <li
              className={filter === "segundo" ? "active" : ""}
              onClick={() => {
                setFilter("segundo");
                setCurrentPage(1);
              }}
            >
              Segundo Año
            </li>
          </ul>
        </div>
      </div>

      {/* Courses Grid */}
      <section className="meetings-page" id="meetings">
        <div className="container">
          <div className="row grid">
            {currentCourses.map((course) => (
              <div
                key={course.classId} // ahora usamos classId, que es único
                className="col-12 col-md-6 col-lg-4 templatemo-item-col all"
              >
                <div
                  className="meeting-item"
                  onClick={() => navigate(`/courses/${course.classId}`)}
                >
                  <div className="thumb">
                    <img
                      src={`/images/subjects/${course.subjectId || "default"}.jpg`}
                      alt={course.subject.name}
                    />
                  </div>

                  <div className="down-content">
                    <h4 className="course-title-link">{course.subject.name}</h4>

                    <div className="course-info">
                      {/* Fecha */}
                      <p>
                        <strong>Fecha:</strong>{" "}
                        {course.startDate && course.endDate
                          ? `${new Date(course.startDate).toLocaleDateString(
                              "es-ES",
                              { month: "short" }
                            )} ${new Date(course.startDate).getDate()} - ${new Date(
                              course.endDate
                            ).toLocaleDateString("es-ES", { month: "short" })} ${new Date(
                              course.endDate
                            ).getDate()}`
                          : "Fecha no disponible"}
                      </p>

                      {/* Turno */}
                      <p>
                        <strong>Turno:</strong>{" "}
                        {shiftMap[course.classShift] || "No disponible"}
                      </p>
                    </div>

                    {/* Profesor */}
                    <p>
                      <strong>Docente:</strong> {course.teacher.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="row">
              <div className="col-lg-12">
                <div className="pagination mt-4">
                  <ul>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li
                        key={i}
                        className={currentPage === i + 1 ? "active" : ""}
                      >
                        <a href="#!" onClick={() => setCurrentPage(i + 1)}>
                          {i + 1}
                        </a>
                      </li>
                    ))}
                    {currentPage < totalPages && (
                      <li>
                        <a
                          href="#!"
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          <i className="fa fa-angle-right"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AllCoursesView;
