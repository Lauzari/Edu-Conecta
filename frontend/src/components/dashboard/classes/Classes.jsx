import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Pagination from "../../ui/pagination/Pagination.jsx";
import ConfirmationModal from "../../ui/confirmationModal/ConfirmationModal.jsx";
import EditClassModal from "./editClassModal/EditClassModal.jsx";

const dummyClasses = Array.from({ length: 43 }, (_, i) => ({
  id: i + 1,
  subjectName: `Materia ${i + 1}`,
  teacherName: ["Pepe Pérez", "María Salomón", "Julia Calvo"][i % 3],
  classShift: ["Mañana", "Tarde", "Noche"][i % 3],
  startDate: `22/10/2025`,
}));

function Classes({ searchTerm }) {
  const [classes, setClasses] = useState(dummyClasses);
  const [currentPage, setCurrentPage] = useState(1);

  // States used for Modals
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const classesPerPage = 10;

  // Filtered by searchTerm from Dashboard.jsx
  const filtered = classes.filter(
    (classCustom) =>
      classCustom.subjectName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      classCustom.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filtered.slice(indexOfFirstClass, indexOfLastClass);
  const totalPages = Math.ceil(filtered.length / classesPerPage);

  const handleDelete = () => {
    if (selectedClassId !== null) {
      //HACER REQUEST A API
      setClasses(
        classes.filter((classCustom) => classCustom.id !== selectedClassId)
      );
      console.log("Clase eliminada con id:", selectedClassId);
      setSelectedClassId(null);
    }
  };

  const handleEdit = (id) => {
    console.log("Editar clase con id:", id);
    setSelectedClassId(id);
    setShowEditModal(true);
  };

  const openDeleteModal = (id) => {
    setSelectedClassId(id);
    setShowModal(true);
  };

  const handleUpdateClass = (updatedClassData) => {
    // HACER REQUEST A API
    setClasses((prev) =>
      prev.map((cls) =>
        cls.id === updatedClassData.id ? { ...cls, ...updatedClassData } : cls
      )
    );
    console.log("Clase actualizada:", updatedClassData);
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentClasses.map((classCustom) => (
            <tr key={classCustom.id}>
              <td>{classCustom.subjectName}</td>
              <td>{classCustom.teacherName}</td>
              <td>{classCustom.classShift}</td>
              <td>{classCustom.startDate}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(classCustom.id)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => openDeleteModal(classCustom.id)}
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
