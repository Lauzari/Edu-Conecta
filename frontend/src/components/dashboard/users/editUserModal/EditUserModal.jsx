import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { validateUserData } from "./editUserValidations.js";
import { useAuth } from "../../../../hooks/useAuth.js";

function EditUserModal({ show, onHide, userId, onSave }) {
  const [errors, setErrors] = useState({});
  const [originalIsAdmin, setOriginalIsAdmin] = useState(false);
  const [showRoleWarning, setShowRoleWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [saving, setSaving] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const [userData, setUserData] = useState({
    name: "",
    birthDate: "",
    email: "",
    role: "",
  });

  const { token } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (show && userId) {
        setLoading(true);
        setFetchError(null);
        setShowRoleWarning(false);
        try {
          const response = await fetch(
            `${apiUrl}/User/userInfo?id=${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              `Error al obtener datos del usuario (HTTP ${response.status})`
            );
          }

          const data = await response.json();

          setUserData({
            name: data.name,
            birthDate: data.birthDate,
            email: data.email,
            role: data.userType,
          });

          setOriginalIsAdmin(data.userType === "Admin");
        } catch (err) {
          console.error("Error al obtener el usuario:", err);
          setFetchError("No se pudo obtener la información del usuario.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [show, userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (userData.role === "Professor") return;

      const newRole = checked ? "Admin" : "Student";

      setUserData((prev) => ({
        ...prev,
        role: newRole,
      }));

      setShowRoleWarning(checked !== originalIsAdmin);
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    const { isValid, errors } = validateUserData(userData);
    if (!isValid) {
      setErrors(errors);
      return;
    }

    setSaving(true);
    setFetchError(null);

    try {
      const body = {
        id: userId,
        email: userData.email,
        name: userData.name,
        birthDate: userData.birthDate,
        userType: userData.role,
      };

      const response = await fetch(`${apiUrl}/User/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(
          `Error al actualizar el usuario (HTTP ${response.status})`
        );
      }

      const updatedUser = await response.json();
      onSave(updatedUser);
      onHide();
    } catch (err) {
      console.error("Error al actualizar el usuario:", err);
      setFetchError("No se pudo actualizar el usuario. Inténtelo nuevamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setUserData({
      name: "",
      birthDate: "",
      email: "",
      role: "",
    });
    setErrors({});
    setOriginalIsAdmin(false);
    setShowRoleWarning(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "150px" }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        ) : fetchError ? (
          <Alert variant="danger">{fetchError}</Alert>
        ) : (
          <>
            <p className="text-muted">
              Solo el usuario en cuestión puede modificar su contraseña.
            </p>

            {showRoleWarning && (
              <Alert variant="warning">
                Usted está modificando el rol del usuario.
              </Alert>
            )}

            <Form>
              <Form.Group className="mb-3" controlId="userName">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="text-danger small mt-1">{errors.name}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="userBirthDate">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={userData.birthDate}
                  onChange={handleChange}
                />
                {errors.birthDate && (
                  <div className="text-danger small mt-1">
                    {errors.birthDate}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  readOnly
                />
                {errors.email && (
                  <div className="text-danger small mt-1">{errors.email}</div>
                )}
              </Form.Group>

              {userData.role === "Professor" ? (
                ""
              ) : (
                <Form.Group controlId="userIsAdmin" className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="¿Es administrador?"
                    name="isAdmin"
                    checked={userData.role === "Admin"}
                    onChange={handleChange}
                  />
                </Form.Group>
              )}
            </Form>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          variant="success"
          onClick={handleSave}
          disabled={loading || fetchError}
          style={{ backgroundColor: "#039a51", borderColor: "#039a51" }}
        >
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
