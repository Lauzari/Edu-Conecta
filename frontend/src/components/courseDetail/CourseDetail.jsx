import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseDetail.css";
import { useAuth } from "../../hooks/useAuth";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, role, userId } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `https://localhost:7018/Class/GetClassWithStudents?id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          console.error(
            "Fallo la llamada al backend:",
            response.status,
            response.statusText
          );
          throw new Error(`Error ${response.status} al obtener el curso.`);
        }

        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchCourse();
  }, [id, token]);

  if (loading) return <p>Cargando...</p>;
  if (error) console.log(error);
  // if (!course) return <p>Curso no encontrado</p>;

  const startDate = course.startDate ? new Date(course.startDate) : null;
  const endDate = course.endDate ? new Date(course.endDate) : null;

  return (
    <div>
      {/* Heading Page */}
      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h6>Detalles del curso</h6>
              <h2>{course.subject.name}</h2>
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
                  <img
                    src={`/images/subjects/${course.subject.id}.jpg`}
                    alt={course.subject.name}
                  />
                </div>

                <div className="down-content">
                  <h4>{course.subject.name}</h4>
                  <p className="description">
                    {course.classDescription || course.subject.description}
                  </p>

                  {/* Date and shift */}
                  <div className="course-info">
                    <p>
                      <strong>Fecha:</strong>{" "}
                      {startDate && endDate
                        ? `${startDate.toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                          })} - ${endDate.toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                          })}`
                        : "Fecha no disponible"}
                    </p>
                    <p>
                      <strong>Turno:</strong>{" "}
                      {course.classShift || "No disponible"}
                    </p>
                    {course.zoomLink && (
                      <p>
                        <strong>Zoom:</strong>{" "}
                        <a
                          href={course.zoomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {course.zoomLink}
                        </a>
                      </p>
                    )}
                  </div>

                  {/* Professor */}
                  <p>
                    <strong>Docente:</strong> {course.teacher.name} (
                    {course.teacher.email})
                  </p>

                  {/* Buttons */}
                  <div className="course-buttons mt-4">
                    <button
                      className="main-button-red"
                      onClick={() => navigate("/courses")}
                    >
                      Volver a la lista
                    </button>
                    {userId == course.teacher.id && (
                      <button className="main-button-red">Crear curso</button>
                    )}
                    {role === "Student" && course.studentCount < 15 && (
                      <button className="main-button-red">Inscribirme</button>
                    )}

                    {course.studentCount >= 15 && (
                      <p>No hay cupos en la clase</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseDetail;
