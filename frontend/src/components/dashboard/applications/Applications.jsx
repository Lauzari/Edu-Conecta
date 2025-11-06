import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import Pagination from "../../ui/pagination/Pagination.jsx";
import ConfirmationModal from "../../ui/confirmationModal/ConfirmationModal.jsx";

function Applications({ searchTerm }) {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);
  const appsPerPage = 10;

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4IiwibmFtZSI6IkFkbWluIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNzYyNDMwNjE2LCJleHAiOjE3NjI0MzQyMTYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNjkiLCJhdWQiOiJFZHVDb25lY3RhQVBJIn0.kfrtULpt46gZMLWiyiMVDOvV-NP6MhUzk-MY9aQ6wl4";

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(
          "https://localhost:7018/api/ProfessorRequest",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener las solicitudes");
        }

        const data = await response.json();

        const formattedData = data.map((req) => ({
          id: req.id,
          applicantId: req.applicantId,
          name: req.applicantName,
          status: req.status || "Pending",
        }));

        setApplications(formattedData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchApplications();
  }, []);

  const orderedApplications = [...applications].sort((a, b) => {
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;
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

  const handleAccept = async (id) => {
    try {
      const app = applications.find((a) => a.id === id);
      const applicantId = app?.applicantId || id;

      const response = await fetch(
        `https://localhost:7018/api/ProfessorRequest/acceptRequest`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id,
            applicantId,
          }),
        }
      );

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`Error al aceptar la solicitud: ${msg}`);
      }

      const data = await response.json(); // DTO de salida
      // Actualizamos el estado local
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: data.status || "Accepted" } : app
        )
      );
    } catch (error) {
      console.error(error);
      setError("No se pudo aceptar la solicitud.");
    }
  };

  const handleReject = async (id) => {
    try {
      const app = applications.find((a) => a.id === id);
      const applicantId = app?.applicantId || id;

      const response = await fetch(
        `https://localhost:7018/api/ProfessorRequest/declineRequest`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id,
            applicantId,
          }),
        }
      );

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(`Error al rechazar la solicitud: ${msg}`);
      }

      const data = await response.json();
      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: data.status || "Rejected" } : app
        )
      );
    } catch (error) {
      console.error(error);
      setError("No se pudo rechazar la solicitud.");
    }
  };

  const handleConfirm = () => {
    if (modalAction === "accept") {
      handleAccept(selectedId);
    } else if (modalAction === "reject") {
      handleReject(selectedId);
    }
    setShowModal(false);
  };

  if (error) return <Alert variant="danger">{error}</Alert>;

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
            <th>Nombre del postulante</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentApplications.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.name}</td>
              <td>{app.status}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  disabled={app.status !== "Pending"}
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
                  disabled={app.status !== "Pending"}
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
