import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { validateUserData } from "./editUserValidations.js";

function EditUserModal({ show, onHide, userId, onSave }) {
  const [errors, setErrors] = useState({});
  const [originalIsAdmin, setOriginalIsAdmin] = useState(false);
  const [showRoleWarning, setShowRoleWarning] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    birthDate: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (show && userId) {
      // HACER REQUEST A API
      const mockUser = {
        id: userId,
        name: "Juan Pérez",
        birthDate: "1990-05-12",
        email: "juan.perez@example.com",
        role: "Student",
      };
      setUserData(mockUser);
      setOriginalIsAdmin(mockUser.role === "Admin");
    }
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

  const handleSave = () => {
    const { isValid, errors } = validateUserData(userData);
    if (!isValid) {
      setErrors(errors);
      return;
    }
    onSave(userData);
    onHide();
  };

  const handleCancel = () => {
    setUserData({
      name: "",
      birthDate: "",
      email: "",
      role: "",
    });
    setErrors({});
    setShowRoleWarning(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
                <div className="text-danger small mt-1">{errors.birthDate}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@correo.com"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="text-danger small mt-1">{errors.email}</div>
              )}
            </Form.Group>

            {userData.role === "Professor" ? (
              ""
            ) : (
              <Form.Group controlId="userIsAdmin" className="mt-3">
                {" "}
                <Form.Check
                  type="checkbox"
                  label="¿Es administrador?"
                  name="isAdmin"
                  checked={userData.role === "Admin"}
                  onChange={handleChange}
                />{" "}
              </Form.Group>
            )}
          </Form>
        </>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          variant="success"
          onClick={handleSave}
          style={{ backgroundColor: "#039a51", borderColor: "#039a51" }}
        >
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
