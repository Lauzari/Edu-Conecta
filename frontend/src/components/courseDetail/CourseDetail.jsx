import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CourseDetail.css";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, role, userId } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log(userId);
        const response = await fetch(
          `https://localhost:7018/Class/GetClassWithStudents?id=${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) {
          if (response.status === 404) {
            navigate("/404", { replace: true });
            return;
          }
          throw new Error(`Error ${response.status} al obtener el curso`);
        }

        const data = await response.json();

        if (!data) {
          navigate("/404", { replace: true });
          return;
        }

        setCourse(data);
        setIsEnrolled(course?.students?.some(student => student.id === userId));
      } catch (err) {
        console.error(err);
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token, navigate]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const response = await fetch(
        `https://localhost:7018/Class/${id}/enrollStudent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userId),
        }
      );

      if (!response.ok) {
        toast.error("No se pudo inscribir a esta materia. Inténtelo de nuevo más tarde.");
        const errText = await response.text();
        throw new Error(errText || "Error al inscribirse");
      }

      toast.success("¡Inscripción exitosa!");
      setCourse((prev) => ({
        ...prev,
        studentCount: prev.studentCount + 1,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setEnrolling(false);
    }
  };

  const startDate = course?.startDate ? new Date(course?.startDate) : null;
  const endDate = course?.endDate ? new Date(course?.endDate) : null;

  return (
    <div>
      {/* Heading Page */}
      <section className="heading-page header-text" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h6>Detalles del curso</h6>
              <h2>{course?.subject?.name}</h2>
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
                    src={`/images/subjects/${course?.subject?.id}.jpg`}
                    alt={course?.subject?.name}
                  />
                </div>

                <div className="down-content">
                  <h4>{course?.subject?.name}</h4>
                  <p className="description">
                    {course?.classDescription || course?.subject?.description}
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
                      <strong>Turno:</strong> {course?.classShift || "No disponible"}
                    </p>
                    {course?.zoomLink && (
                      <p>
                        <strong>Zoom:</strong>{" "}
                        <a
                          href={course?.zoomLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {course?.zoomLink}
                        </a>
                      </p>
                    )}
                  </div>

                  {/* Professor */}
                  <p>
                    <strong>Docente:</strong> {course?.teacher?.name} (
                    {course?.teacher?.email})
                  </p>

                  {/* Buttons */}
                  <div className="course-buttons mt-4">
                    <button
                      className="main-button-red"
                      onClick={() => navigate("/courses")}
                    >
                      Volver a la lista
                    </button>
                    {userId === course?.teacher?.id && (
                      <button className="main-button-red">Modificar curso</button>
                    )}
                    {role === "Student" && course?.studentCount < 15 && (
                      <button
                        className="main-button-red"
                        onClick={handleEnroll}
                        disabled={isEnrolled}
                      >
                        {enrolling ? "Inscribiendo..." : "Inscribirme"}
                      </button>
                    )}

                    {course?.studentCount >= 15 && (
                      <p>No hay cupos disponibles.</p>
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
