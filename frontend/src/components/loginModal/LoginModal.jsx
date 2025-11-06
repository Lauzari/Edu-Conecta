import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import "./loginModal.css";
import { validateLoginForm } from "./loginValidation";

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegisterNavigate = () => {
    navigate("/register");
    handleClose();
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // validations from loginValidations.js
    const errors = validateLoginForm({ email, password });

    if (Object.keys(errors).length > 0) {
      // We show only the first error
      setError(Object.values(errors)[0]);
      return;
    }
    try {
      const response = await fetch("http://localhost:7018/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Email o contraseña incorrectos");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        throw new Error("Ocurrió un error al iniciar sesión");
      }

      handleClose();
      navigate("/");
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err.message);
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>INICIAR SESIÓN</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleLogin}>
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
                type="button"
                className="showPassword"
                onClick={togglePasswordVisibility}
              >
                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} />
              </Button>
            </InputGroup>
          </Form.Group>

          <div className="main-button-green">
            <button type="submit">Iniciar sesión</button>
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
