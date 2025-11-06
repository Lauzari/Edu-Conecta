import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Pagination from "../../ui/pagination/Pagination.jsx";
import ConfirmationModal from "../../ui/confirmationModal/ConfirmationModal.jsx";
import EditClassModal from "./editClassModal/EditClassModal.jsx";

function Classes({ searchTerm }) {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // States used for Modals
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const classesPerPage = 10;

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwibmFtZSI6IkFkbWluIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzYyNDI2NTg0LCJleHAiOjE3NjI0MzAxODQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNjkiLCJhdWQiOiJFZHVDb25lY3RhQVBJIn0.WONp04QI_lV0wSqG9X7rM39WetZyiQ4gZ7vjpuHrKik";

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("https://localhost:7018/Class", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las clases");
        }

        const data = await response.json();

        const formatted = data.map((cls) => ({
          id: cls.classId,
          subjectName: cls.subject?.name || "Sin nombre",
          teacherName: cls.teacher?.name || "Sin profesor",
          classShift: cls.classShift,
          startDate: new Date(cls.startDate).toLocaleDateString("es-AR"),
          endDate: new Date(cls.endDate).toLocaleDateString("es-AR"),
        }));

        setClasses(formatted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, []);

  // Filtered by searchTerm
  const filtered = classes.filter(
    (cls) =>
      cls.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filtered.slice(indexOfFirstClass, indexOfLastClass);
  const totalPages = Math.ceil(filtered.length / classesPerPage);

  const handleDelete = async () => {
    if (selectedClassId !== null) {
      try {
        const response = await fetch(
          `https://localhost:7018/Class/Delete?id=${selectedClassId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al eliminar la clase");
        }

        setClasses(classes.filter((cls) => cls.id !== selectedClassId));
        setSelectedClassId(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (id) => {
    setSelectedClassId(id);
    setShowEditModal(true);
  };

  const openDeleteModal = (id) => {
    setSelectedClassId(id);
    setShowModal(true);
  };

  const handleUpdateClass = (updatedClassData) => {
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === updatedClassData.id
          ? {
              ...cls,
              subjectName: updatedClassData.subjectName || cls.subjectName,
              classShift: updatedClassData.classShift || cls.classShift,
              startDate: updatedClassData.startDate || cls.startDate,
              endDate: updatedClassData.endDate || cls.endDate,
              teacherName: cls.teacherName, // we maintain the existing value because it cannot change
            }
          : cls
      )
    );
  };

  return (
    <div
      className="p-3 bg-white rounded shadow-sm"
      style={{ overflowX: "auto" }}
    >
      <h4 className="mb-3">Clases</h4>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre de materia</th>
            <th>Nombre de profesor</th>
            <th>Turno</th>
            <th>Fecha de inicio</th>
            <th>Fecha de fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentClasses.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.subjectName}</td>
              <td>{cls.teacherName}</td>
              <td>{cls.classShift}</td>
              <td>{cls.startDate}</td>
              <td>{cls.endDate}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(cls.id)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => openDeleteModal(cls.id)}
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

      <ConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title="Eliminar clase"
        message="¿Estás seguro de que querés eliminar esta clase? Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
      />

      <EditClassModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        classId={selectedClassId}
        onSave={handleUpdateClass}
      />
    </div>
  );
}

export default Classes;
