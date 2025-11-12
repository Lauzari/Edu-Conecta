import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import "./loginModal.css";
import { validateLoginForm } from "./loginValidation";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const handleRegisterNavigate = () => {
    navigate("/register");
    handleModalClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


const resetForm = () => {
  setEmail("");
  setPassword("");
  setError("");
  setShowPassword(false);
  setLoading(false);
};

const handleModalClose = () => {
  resetForm();
  handleClose();
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const errors = validateLoginForm({ email, password });
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${apiUrl}/api/authentication/authenticate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Credenciales inválidas");
      }

      const token = await response.text();
      handleLogin(token);
      toast.success("¡Inicio de sesión exitoso!");
      handleModalClose();
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al iniciar sesión");
      toast.error("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>INICIAR SESIÓN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                className="showPassword"
                type="button"
                onClick={togglePasswordVisibility}
              >
                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} />
              </Button>
            </InputGroup>
          </Form.Group>

          <div className="main-button-green">
            <button type="submit" disabled={loading}>
              {loading ? "Iniciando..." : "Iniciar sesión"}
            </button>
          </div>
        </Form>
        <button onClick={handleRegisterNavigate} className="login-link">
          ¿Todavía no tenés tu cuenta? Registrate acá
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;