import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { validatePasswordFields } from "./passwordModal";

function PasswordModal({ show, handleClose, apiUrl, token }) {
  
    const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const { currentPassword, newPassword } = values;
    const validationErrors = validatePasswordFields(currentPassword, newPassword);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      
      const response = await fetch(`${apiUrl}/User/changePassword`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al cambiar la contraseña.");
      }

      alert("Contraseña actualizada correctamente.");
      handleClose();
    } catch (error) {
      console.error(error);
      setErrors([error.message || "Ocurrió un error inesperado."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar contraseña</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errors.length > 0 && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errors.map((err, i) => (
              <p key={i} style={{ margin: 0 }}>
                {err}
              </p>
            ))}
          </div>
        )}

        <Form>
          <Form.Group className="mb-3" controlId="currentPassword">
            <Form.Label>Contraseña actual</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              placeholder="Ingrese su contraseña actual"
              value={values.currentPassword}
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>Nueva contraseña</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              placeholder="Ingrese su nueva contraseña"
              value={values.newPassword}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PasswordModal;
