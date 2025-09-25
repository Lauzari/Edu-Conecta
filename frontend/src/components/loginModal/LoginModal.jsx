import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import "./loginModal.css";

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
    console.log("Se inició sesión con éxito")
    //   const response = await fetch("http://localhost:5000/api/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Credenciales inválidas");
    // }
    //   const data = await response.json();
    //   localStorage.setItem("token", data.token);
    //   handleClose();
    } catch (err) {
      console.log("Error al iniciar sesión")
    //   setError(err.message || "Error al iniciar sesión");
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
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="main-button-green">
            <button type="submit">Iniciar sesión</button>
          </div>
        </Form>
        {/* LINK NO FUNCIONAL */}
        <Link to="/register" className="login-link">¿Todavía no tenés tu cuenta? Registrate acá</Link>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
