import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllCoursesView.css";

function AllCoursesView() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const coursesPerPage = 4;

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
    filter === "all" ? courses : courses.filter((c) => c.year === filter);

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
                key={course.id}
                className="col-12 col-md-6 col-lg-4 templatemo-item-col all"
              >
                <div
                  className="meeting-item"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  <div className="thumb">
                    <img src={course.img} alt={course.title} />
                  </div>

                  <div className="down-content">
                    <h4 className="course-title-link">{course.title}</h4>

                    <div className="course-info">
                      {/* Date */}
                      <p>
                        <strong>Fecha:</strong>{" "}
                        {course.startDate && course.endDate
                          ? `${new Date(course.startDate).toLocaleDateString(
                              "es-ES",
                              { month: "short" }
                            )} ${new Date(
                              course.startDate
                            ).getDate()} - ${new Date(
                              course.endDate
                            ).toLocaleDateString("es-ES", {
                              month: "short",
                            })} ${new Date(course.endDate).getDate()}`
                          : "Fecha no disponible"}
                      </p>

                      {/* Hour */}
                      <p>
                        <strong>Horario:</strong>{" "}
                        {course.hours ? course.hours : "Horario no disponible"}
                      </p>
                    </div>

                    {/* Professor */}
                    <p>
                      <strong>Docente:</strong>
                      {course.professor}
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
