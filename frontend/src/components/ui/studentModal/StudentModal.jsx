import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import ConfirmModal from "../confirmationModal/ConfirmationModal.jsx";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth.js";
import "./StudentModal.css";
import { toast } from "react-toastify";

function StudentModal({ show, onHide, classId }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  useEffect(() => {
    if (show && classId) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `https://localhost:7018/Class/GetClassWithStudents?id=${classId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok)
            throw new Error("Error al obtener los datos de la clase");

          const data = await response.json();
          setCourseData(data);
          setStudents(data.students || []);
        } catch (error) {
          console.error("Error cargando clase:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [show, classId, token]);

  const handleConfirmDelete = async () => {
    console.log(selectedStudent.id);
    if (!selectedStudent) return;

    try {
      const response = await fetch(
        `https://localhost:7018/Class/${classId}/deleteStudent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(selectedStudent.id),
        }
      );

      if (!response.ok) throw new Error("Error al eliminar al estudiante");

      setStudents((prev) => prev.filter((s) => s.id !== selectedStudent.id));
      toast.success("Estudiante eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    } finally {
      setSelectedStudent(null);
      setShowConfirm(false);
    }
  };

  const handleDeleteClick = (student) => {
    setSelectedStudent(student);
    setShowConfirm(true);
  };

  if (loading) {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Body>
          <p>Cargando alumnos...</p>
        </Modal.Body>
      </Modal>
    );
  }

  const sortedStudents = [...students].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const groupedStudents = sortedStudents.reduce((groups, student) => {
    const firstLetter = student.name[0].toUpperCase();
    if (!groups[firstLetter]) groups[firstLetter] = [];
    groups[firstLetter].push(student);
    return groups;
  }, {});

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {courseData ? `${courseData.subject.name}` : "Materia"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>Alumnos inscriptos</h5>

          <div className="students-list">
            {Object.keys(groupedStudents).length > 0 ? (
              Object.keys(groupedStudents).map((letter) => (
                <div key={letter} className="student-group mb-3">
                  <h6 className="group-letter">{letter}</h6>
                  {groupedStudents[letter].map((student) => (
                    <div
                      className="student-item d-flex align-items-center justify-content-between border p-2 rounded mb-2"
                      key={student.id}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: "50px",
                            height: "50px",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                          }}
                        >
                          {student.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h6 className="mb-0">{student.name}</h6>
                          <small className="text-muted">{student.email}</small>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteClick(student)}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No hay alumnos inscriptos aún.</p>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        title="Confirmar eliminación"
        message={
          selectedStudent
            ? `¿Estás segura/o de eliminar a ${selectedStudent.name}?`
            : "¿Eliminar usuario?"
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default StudentModal;
