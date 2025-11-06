import { useEffect , useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseDetail.css";
import { useAuth } from "../../hooks/useAuth";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth(); 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://localhost:7018/Class/GetClass?id=${classId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

        if (!response.ok) {
          throw new Error("Error al obtener el curso");
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
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!course) return <p>Curso no encontrado</p>;

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
                    <p>
                      <strong>Horario:</strong>{" "}
                      {course.hours ? hoursFormatted : "Horario no disponible"}
                    </p>
                  </div>

                  {/* Professor */}
                  <p>
                    <strong>Docente: </strong> {course.professor}{" "}
                  </p>

                  {/* Buttons */}
                  <div className="course-buttons mt-4">
                    <button
                      className="main-button-red"
                      onClick={() => navigate("/courses")}
                    >
                      Volver a la lista de cursos
                    </button>
                    <button className="main-button-red">Crear curso</button>
                    <button className="main-button-red">Inscripción</button>
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
