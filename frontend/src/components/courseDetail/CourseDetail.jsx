import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./courseDetail.css";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, role, userId } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/Class/GetClassWithStudents?id=${id}`,
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

        const enrolled = data.students?.some(
          (student) => student.id === Number(userId)
        );
        setIsEnrolled(enrolled);
      } catch (err) {
        navigate("/404", { replace: true });
      }
    };

    fetchCourse();
  }, [id, token, navigate, userId]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const response = await fetch(
        `${apiUrl}/Class/${id}/enrollStudent`,
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
        toast.error(
          "No se pudo inscribir a esta materia. Inténtelo de nuevo más tarde."
        );
        const errText = await response.text();
        throw new Error(errText || "Error al inscribirse");
      }

      toast.success("¡Inscripción exitosa!");
      setCourse((prev) => ({
        ...prev,
        studentCount: prev.studentCount + 1,
      }));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setEnrolling(false);
    }
  };

  const handleDropClass = async () => {
    if (!userId || !id) return;
    setEnrolling(true);
    try {
      const response = await fetch(
        `${apiUrl}/Class/${id}/deleteStudent`,
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
        toast.error(
          "No se pudo abandonar la clase. Inténtelo de nuevo más tarde."
        );
        const errText = await response.text();
        throw new Error(errText || "Error al abandonar la clase");
      }

      toast.success("Has abandonado la clase correctamente.");
      setCourse((prev) => ({
        ...prev,
        studentCount: prev.studentCount > 0 ? prev.studentCount - 1 : 0,
        students: prev.students.filter((s) => s.id !== Number(userId)),
      }));
      setIsEnrolled(false);
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error al abandonar la clase.");
    } finally {
      setEnrolling(false);
    }
  };

  const startDate = course?.startDate ? new Date(course?.startDate) : null;
  const endDate = course?.endDate ? new Date(course?.endDate) : null;

  return (
    <div className="general-container">
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
                    onError={(e) =>
                      (e.target.src = "/images/subjects/default.jpg")
                    }
                  />
                </div>

                <div className="down-content">
                  <h4>{course?.subject?.name}</h4>
                  {Number(userId) === Number(course?.teacher?.id) && (
                    <div className="alert alert-info mt-3" role="alert">
                      Usted es docente de esta clase. Puede modificar sus datos
                      en la pestaña <strong>"Mis cursos"</strong>.
                    </div>
                  )}
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
                      <strong>Turno:</strong>{" "}
                      {course?.classShift || "No disponible"}
                    </p>
                    {course?.zoomLink && (isEnrolled || Number(userId) === Number(course?.teacher?.id)) && (
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

                    {role === "Student" &&
                      course?.studentCount < 15 &&
                      !isEnrolled && (
                        <button
                          className="main-button-red"
                          onClick={handleEnroll}
                          disabled={enrolling}
                        >
                          {enrolling ? "Inscribiendo..." : "Inscribirme"}
                        </button>
                      )}

                    {isEnrolled && (
                      <button
                        className="main-button-red"
                        onClick={handleDropClass}
                        disabled={enrolling}
                      >
                        {enrolling ? "Cargando..." : "Dejar la clase"}
                      </button>
                    )}

                    {course?.studentCount >= 15 && !isEnrolled && (
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
