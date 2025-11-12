import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./MyCourses.css";
import ConfirmationModal from "../ui/confirmationModal/ConfirmationModal";
import ClassModal from "../ui/classModal/ClassModal";
import StudentModal from "../ui/studentModal/StudentModal";

function MyCourses() {
  const [userData, setUserData] = useState(null);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const { token, userId, role, isReady } = useAuth();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiUrl}/User/completeUserInfo?id=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Error al obtener los cursos");
      const data = await response.json();
      setUserData(data);
    } catch {
      toast.error("No se pudieron cargar tus cursos.");
    }
  }, [userId, token]);

  useEffect(() => {
    if (isReady && token && userId) {
      fetchUserData();
    }
  }, [isReady, token, userId, fetchUserData]);

  const openConfirmModal = (classId) => {
    setSelectedClassId(classId);
    setConfirmModal(true);
  };

  const handleOpenCreateClass = () => {
    setSelectedClass(null);
    setShowClassModal(true);
  };

  const handleEditClass = (classData) => {
    setSelectedClass(classData);
    setShowClassModal(true);
  };

  const handleShowStudents = (classId) => {
    setSelectedClassId(classId);
    setShowStudentsModal(true);
  };

  const handleDropClass = async () => {
    if (!selectedClassId) return;
    setConfirmModal(false);

    try {
      const response = await fetch(
        `${apiUrl}/Class/${selectedClassId}/deleteStudent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userId),
        }
      );

      if (!response.ok) throw new Error();

      toast.success("Has abandonado la clase.");
      await fetchUserData();
    } catch {
      toast.error("Error al abandonar la clase.");
    } finally {
      setSelectedClassId(null);
    }
  };

  const handleDeleteClass = async () => {
    if (!selectedClassId) return;
    setConfirmModal(false);

    try {
      const response = await fetch(
        `${apiUrl}/Class/Delete?id=${selectedClassId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error();

      toast.success("La clase fue eliminada correctamente.");
      await fetchUserData();
    } catch {
      toast.error("Error al eliminar la clase.");
    } finally {
      setSelectedClassId(null);
    }
  };

  const handleSaveClass = async () => {
    await fetchUserData();
    setShowClassModal(false);
    toast.success("Clase guardada correctamente.");
  };

  const translateShift = (shift) => {
    const map = {
      Morning: "Mañana",
      Afternoon: "Tarde",
      Evening: "Noche",
    };
    return map[shift] || shift;
  };

  if (!isReady) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="general-container">
      <section
        className="heading-page my-courses header-text text-center"
        id="top"
      >
        <div className="container">
          <h2>Mis cursos</h2>
        </div>
      </section>

      <div className="container my-4">
        {role === "Professor" && (
          <div className="d-flex justify-content-end mb-4">
            <button
              className="btn btn-success fw-semibold rounded-pill px-4"
              onClick={handleOpenCreateClass}
            >
              + Agregar nueva clase
            </button>
          </div>
        )}

        <div className="row g-4">
          {userData?.classes?.map((course) => (
            <div
              key={course.classId}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card h-100 shadow-sm d-flex flex-column">
                <img
                  src={
                    course.subject?.id
                      ? `/images/subjects/${course.subject.id}.jpg`
                      : "/images/subjects/default.jpg"
                  }
                  alt={course.subject?.name || "Materia sin imagen"}
                  className="card-img-top"
                  onError={(e) =>
                    (e.target.src = "/images/subjects/default.jpg")
                  }
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center">
                    {course.subject?.name}
                  </h5>
                  <p className="card-text mb-1">
                    <strong>Docente:</strong>{" "}
                    {course.teacher?.name || "No asignado"}
                  </p>
                  <p className="card-text">
                    <strong>Turno:</strong> {translateShift(course.classShift)}
                  </p>

                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <button
                        className="btn custom-btn"
                        onClick={() => navigate(`/courses/${course.classId}`)}
                      >
                        Detalles
                      </button>

                      {role === "Professor" ? (
                        <>
                          <button
                            className="btn custom-btn"
                            onClick={() => handleEditClass(course)}
                          >
                            Modificar
                          </button>
                          <button
                            className="btn custom-btn"
                            onClick={() => handleShowStudents(course.classId)}
                          >
                            Lista de estudiantes
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => openConfirmModal(course.classId)}
                          >
                            Eliminar
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => openConfirmModal(course.classId)}
                        >
                          Dejar clase
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {userData?.classes?.length === 0 && (
            <div className="text-center mt-5 bg-white p-4 rounded shadow-sm">
              <p className="mb-0 text-dark fw-semibold">
                No hay clases disponibles.
              </p>
            </div>
          )}
        </div>
      </div>

      <ClassModal
        show={showClassModal}
        onHide={() => setShowClassModal(false)}
        classToEdit={selectedClass}
        onSave={handleSaveClass}
      />

      <ConfirmationModal
        show={showConfirmModal}
        onHide={() => setConfirmModal(false)}
        title={role === "Professor" ? "Eliminar clase" : "Dejar la clase"}
        message={
          role === "Professor"
            ? "¿Estás seguro de que querés eliminar esta clase? Esta acción no se puede deshacer."
            : "¿Estás seguro de que querés dejar esta clase? Esta acción no se puede deshacer."
        }
        confirmText="Sí, aceptar"
        cancelText="Cancelar"
        onConfirm={role === "Professor" ? handleDeleteClass : handleDropClass}
      />

      <StudentModal
        show={showStudentsModal}
        onHide={() => setShowStudentsModal(false)}
        classId={selectedClassId}
      />
    </div>
  );
}

export default MyCourses;
