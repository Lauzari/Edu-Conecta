import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Pagination from "../../ui/pagination/Pagination.jsx";
import { useNavigate } from "react-router-dom";
import "./Subjects.css";
import ConfirmationModal from "../../ui/confirmationModal/ConfirmationModal.jsx";
import AddSubjectModal from "./addSubjectModal/AddSubjectModal.jsx";

const dummySubjects = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  name: `Materia ${i + 1}`,
  year: `Año ${i % 2 === 0 ? 1 : 2}`,
  duration: `${(i % 3) + 4} meses`,
  description: `Descripción de la materia ${i + 1}`,
}));

function Subjects({ searchTerm }) {
  const [subjects, setSubjects] = useState(dummySubjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  // States for Modals
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const subjectsPerPage = 10;
  const navigate = useNavigate();

  // What we recieve from the Creation/Edition Modal
  const handleSaveSubject = (formData, subjectId) => {
    if (subjectId) {
      // Edition Mode
      //HACER REQUEST A API
      setSubjects((prev) =>
        prev.map((subj) =>
          subj.id === subjectId ? { ...subj, ...formData } : subj
        )
      );
      console.log("Materia actualizada:", subjectId, formData);
    } else {
      // Creation Mode
      // HACER REQUEST A API
      const newSubject = { id: subjects.length + 1, ...formData };
      setSubjects((prev) => [...prev, newSubject]);
      console.log("Materia creada:", newSubject);
    }
  };

  const handleEdit = (id) => {
    setSelectedSubjectId(id);
    setShowSubjectModal(true);
  };

  const handleCreate = () => {
    setSelectedSubjectId(null);
    setShowSubjectModal(true);
  };

  const handleDelete = () => {
    if (selectedSubjectId !== null) {
      setSubjects((prev) => prev.filter((s) => s.id !== selectedSubjectId));
      console.log("Materia eliminada con id:", selectedSubjectId);
      setSelectedSubjectId(null);
      setShowDeleteModal(false);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedSubjectId(id);
    setShowDeleteModal(true);
  };

  // PAGINATION (logic in UI folder)
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
    <div className="p-3 bg-white rounded shadow-sm" style={{ overflowX: "auto" }}>
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

      {/* Modal de crear/editar materia */}
      <AddSubjectModal
        show={showSubjectModal}
        onHide={() => setShowSubjectModal(false)}
        onSave={handleSaveSubject}
        subjectId={selectedSubjectId}
      />

      {/* Modal de eliminar */}
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
