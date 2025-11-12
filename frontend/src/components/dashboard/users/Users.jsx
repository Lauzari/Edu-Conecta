import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Pagination from "../../ui/pagination/Pagination.jsx";
import ConfirmationModal from "../../ui/confirmationModal/ConfirmationModal.jsx";
import EditUserModal from "./editUserModal/EditUserModal.jsx";
import { useAuth } from "../../../hooks/useAuth.js";
import { toast } from "react-toastify";

function Users({ searchTerm }) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  // Modal States
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const usersPerPage = 10;

  const { token } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/User/allUsersInfo`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const data = await response.json();

      const formattedData = data.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.userType,
        birthDate: u.birthDate,
        registerDate: u.registerDate,
      }));

      setUsers(formattedData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  const handleDelete = async () => {
    if (selectedUserId === null) return;

    try {
      setError(null);

      const response = await fetch(
        `${apiUrl}/User/delete?id=${selectedUserId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error al eliminar usuario (HTTP ${response.status})`);
      }

      toast.success(`Usuario nro. ${selectedUserId} eliminado.`);
      setShowDeleteModal(false);
      setSelectedUserId(null);

      await fetchUsers();
    } catch (err) {
      setError("No se pudo eliminar el usuario. Inténtalo de nuevo.");
      setShowDeleteModal(false);
    }
  };

  const handleEdit = (id) => {
    setSelectedUserId(id);
    setShowEditModal(true);
  };

  const handleSaveUser = async () => {
    try {
      await fetchUsers();
      toast.success("Usuario actualizado correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la lista de usuarios");
    }
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
            <th>Fecha de registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.registerDate).toLocaleDateString()}</td>
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
                  onClick={() => {
                    setSelectedUserId(user.id);
                    setShowDeleteModal(true);
                  }}
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
