import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Pagination from "../../ui/pagination/Pagination.jsx";
import { useNavigate } from "react-router-dom";
import "./Subjects.css";
import ConfirmationModal from "../../ui/confirmationModal/ConfirmationModal.jsx";
import AddSubjectModal from "./addSubjectModal/AddSubjectModal.jsx";

function Subjects({ searchTerm }) {
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  // States for Modals
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const subjectsPerPage = 10;
  const navigate = useNavigate();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwibmFtZSI6IkFkbWluIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzYyNDMwNjE2LCJleHAiOjE3NjI0MzQyMTYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNjkiLCJhdWQiOiJFZHVDb25lY3RhQVBJIn0.kfrtULpt46gZMLWiyiMVDOvV-NP6MhUzk-MY9aQ6wl4";

  // === FETCH SUBJECTS ===
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("https://localhost:7018/api/Subject", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener las materias");

        const data = await response.json();


        const formatted = data.map((subj) => ({
          id: subj.id,
          name: subj.name,
          year: subj.year,
          duration: `${subj.duration} meses`,
          description: subj.description,
        }));

        setSubjects(formatted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
  }, [token]);

// === HANDLE SAVE SUBJECT (solo actualizar estado local) ===
const handleSaveSubject = (savedSubject, subjectId) => {
  if (subjectId) {
    setSubjects((prev) =>
      prev.map((subj) =>
        subj.id === subjectId
          ? {
              id: savedSubject.id,
              name: savedSubject.name,
              year: savedSubject.year,
              duration: `${savedSubject.duration} meses`,
              description: savedSubject.description,
            }
          : subj
      )
    );
  } else {
    setSubjects((prev) => [
      ...prev,
      {
        id: savedSubject.id,
        name: savedSubject.name,
        year: savedSubject.year,
        duration: `${savedSubject.duration} meses`,
        description: savedSubject.description,
      },
    ]);
  }

  setShowSubjectModal(false);
};

  const handleEdit = (id) => {
    setSelectedSubjectId(id);
    setShowSubjectModal(true);
  };

  const handleCreate = () => {
    setSelectedSubjectId(null);
    setShowSubjectModal(true);
  };

  // === HANDLE DELETE SUBJECT ===
  const handleDelete = async () => {
    if (selectedSubjectId !== null) {
      try {
        const response = await fetch(
          `https://localhost:7018/api/Subject/${selectedSubjectId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) throw new Error("Error al eliminar la materia");

        setSubjects((prev) => prev.filter((s) => s.id !== selectedSubjectId));
        setSelectedSubjectId(null);
        setShowDeleteModal(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openDeleteModal = (id) => {
    setSelectedSubjectId(id);
    setShowDeleteModal(true);
  };

  // === PAGINATION ===
  const filtered = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const currentSubjects = filtered.slice(
    indexOfFirstSubject,
    indexOfLastSubject
  );
  const totalPages = Math.ceil(filtered.length / subjectsPerPage);

  return (
    <div
      className="p-3 bg-white rounded shadow-sm"
      style={{ overflowX: "auto" }}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="m-0">Materias</h4>
        <Button
          variant="success"
          onClick={handleCreate}
          className="create-subject-btn"
          style={{ backgroundColor: "#039a51", borderColor: "#039a51" }}
        >
          <span>Crear Materia</span>
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Año</th>
            <th>Duración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentSubjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.name}</td>
              <td>{subject.year}</td>
              <td>{subject.duration}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(subject.id)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => openDeleteModal(subject.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <AddSubjectModal
        show={showSubjectModal}
        onHide={() => setShowSubjectModal(false)}
        onSave={handleSaveSubject}
        subjectId={selectedSubjectId}
      />

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Eliminar materia"
        message="¿Estás seguro de que querés eliminar esta materia? Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Subjects;
