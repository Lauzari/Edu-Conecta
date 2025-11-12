import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Pagination from "../../ui/pagination/Pagination.jsx";
import ConfirmationModal from "../../ui/confirmationModal/ConfirmationModal.jsx";
import EditClassModal from "./editClassModal/EditClassModal.jsx";
import { useAuth } from "../../../hooks/useAuth.js";
import { toast } from "react-toastify";

function Classes({ searchTerm }) {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // States used for Modals
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const classesPerPage = 10;

  const { token } = useAuth();

  const shiftMap = {
    Morning: "Mañana",
    Afternoon: "Tarde",
    Evening: "Noche",
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${apiUrl}/Class`, {
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
          classShift: shiftMap[cls.classShift] || cls.classShift,
          startDate: cls.startDate,
          endDate: cls.endDate,
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
          `${apiUrl}/Class/Delete?id=${selectedClassId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          toast.info("No se pudo eliminar la clase. Inténtelo de nuevo más tarde.");
          throw new Error("Error al eliminar la clase");
        }

        setClasses(classes.filter((cls) => cls.id !== selectedClassId));
        setSelectedClassId(null);
        toast.success("¡Clase eliminada con éxito!");
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
              classShift:
                shiftMap[updatedClassData.classShift] || cls.classShift,
              startDate: updatedClassData.startDate || cls.startDate,
              endDate: updatedClassData.endDate || cls.endDate,
              teacherName: cls.teacherName, // we maintain the existing value because it cannot change
            }
          : cls
      )
    );
    toast.success("¡Clase editada con éxito!");
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
              <td>{cls.startDate.split("T")[0]}</td>
              <td>{cls.endDate.split("T")[0]}</td>
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
