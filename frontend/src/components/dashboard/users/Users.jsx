import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Pagination from "../../ui/pagination/Pagination.jsx";
import ConfirmationModal from "../../ui/confirmationModal/ConfirmationModal.jsx";
import EditUserModal from "./editUserModal/EditUserModal.jsx";

// ARMAR REQUEST DE API
const dummyUsers = Array.from({ length: 153 }, (_, i) => ({
  id: i + 1,
  name: `Usuario ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["estudiante", "docente", "admin"][i % 3],
}));

function Users({ searchTerm }) {
  const [users, setUsers] = useState(dummyUsers);
  const [currentPage, setCurrentPage] = useState(1);

  // States to use Modals (edit & delete)
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const usersPerPage = 10;

  // Filter by search term (from Dashboard.jsx)
  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination (its logic is in UI folder)
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  // ARMAR REQUEST DE API
  const handleDelete = () => {
    if (selectedUserId !== null) {
      setUsers(users.filter((user) => user.id !== selectedUserId));
      console.log("Usuario eliminado con id:", selectedUserId);
      setSelectedUserId(null);
    }
  };
  // ARMAR REQUEST DE API
  const handleEdit = (id) => {
    setSelectedUserId(id);
    setShowEditModal(true);
  };

  const openDeleteModal = (id) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  // ARMAR REQUEST DE API
  // This comes from the Edit Modal
  const handleSaveUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    console.log("Usuario actualizado:", updatedUser);
  };

  return (
    <div
      className="p-3 bg-white rounded shadow-sm"
      style={{ overflowX: "auto" }}
    >
      <h4 className="mb-3">Usuarios</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Mail</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(user.id)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => openDeleteModal(user.id)}
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
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        title="Eliminar usuario"
        message="¿Estás seguro de que querés eliminar el usuario? Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleDelete}
      />

      <EditUserModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        userId={selectedUserId}
        onSave={handleSaveUser}
      />
    </div>
  );
}

export default Users;
