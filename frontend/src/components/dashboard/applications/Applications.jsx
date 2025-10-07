import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import Pagination from "../../ui/pagination/Pagination.jsx";
import ConfirmationModal from "../../ui/confirmationModal/ConfirmationModal.jsx";

// Datos simulados
const dummyApplications = Array.from({ length: 25 }, (_, i) => {
  const statuses = ["Pendiente", "Aceptado", "Rechazado"];
  return {
    id: i + 1,
    name: `Postulante ${i + 1}`,
    date: new Date(2025, 8, (i % 30) + 1).toISOString().split("T")[0], // fechas simuladas
    status: statuses[i % 3],
  };
});

function Applications({ searchTerm }) {
  const [applications, setApplications] = useState(dummyApplications);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const appsPerPage = 10;

  const orderedApplications = [...applications].sort((a, b) => {
    if (a.status === "Pendiente" && b.status !== "Pendiente") return -1;
    if (a.status !== "Pendiente" && b.status === "Pendiente") return 1;
    return 0;
  });

  const filtered = orderedApplications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * appsPerPage;
  const indexOfFirst = indexOfLast - appsPerPage;
  const currentApplications = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / appsPerPage);

  const handleAccept = (id) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Aceptado" } : app))
    );
  };

  const handleReject = (id) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "Rechazado" } : app))
    );
  };

  const handleConfirm = () => {
    if (modalAction === "accept") {
      handleAccept(selectedId);
    } else if (modalAction === "reject") {
      handleReject(selectedId);
    }
    setShowModal(false);
  };

  return (
    <div
      className="p-3 bg-white rounded shadow-sm"
      style={{ overflowX: "auto" }}
    >
      <h4 className="mb-3">Solicitudes para ser docente</h4>
      <p className="text-muted mb-4">
        Los datos del postulante se enviaron a su mail con el número de
        solicitud en el asunto.
      </p>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th># Solicitud</th>
            <th>Nombre</th>
            <th>Fecha de Postulación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.name}</td>
              <td>{app.date}</td>
              <td>{app.status}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  disabled={app.status !== "Pendiente"}
                  onClick={() => {
                    setSelectedId(app.id);
                    setModalAction("accept");
                    setShowModal(true);
                  }}
                >
                  Aceptar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  disabled={app.status !== "Pendiente"}
                  onClick={() => {
                    setSelectedId(app.id);
                    setModalAction("reject");
                    setShowModal(true);
                  }}
                >
                  Rechazar
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
        title={
          modalAction === "accept" ? "Aceptar solicitud" : "Rechazar solicitud"
        }
        message={
          modalAction === "accept"
            ? "¿Estás seguro de que querés aceptar esta solicitud? Esta acción no se puede deshacer."
            : "¿Estás seguro de que querés rechazar esta solicitud? Esta acción no se puede deshacer."
        }
        confirmText={modalAction === "accept" ? "Sí, aceptar" : "Sí, rechazar"}
        cancelText="Cancelar"
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default Applications;
