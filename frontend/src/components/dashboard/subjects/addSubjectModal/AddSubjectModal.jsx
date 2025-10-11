import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { validateSubject } from "./validateSubjectModal.js";

function SubjectModal({ show, onHide, onSave, subjectId }) {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    year: "Año 1",
    duration: "",
    description: "",
  });

  useEffect(() => {
    if (subjectId) {
      // Edition Mode
      // HACER REQUEST A API
      const dummySubject = {
        name: "Matemática Avanzada",
        year: "Año 2",
        duration: 8,
        description: "Materia orientada a cálculo diferencial e integral.",
      };

      setFormData(dummySubject);
    } else {
      // Creation Mode
      setFormData({
        name: "",
        year: "Año 1",
        duration: "",
        description: "",
      });
    }
    setError("");
  }, [subjectId, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSave = () => {
    const validation = validateSubject(formData);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    onSave(formData, subjectId);

    // Reset the form only in Creation Mode
    if (!subjectId) {
      setFormData({ name: "", year: "Año 1", duration: "", description: "" });
    }

    setError("");
    onHide();
  };

  const handleCancel = () => {
    setFormData({ name: "", year: "Año 1", duration: "", description: "" });
    setError("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {subjectId ? "Editar materia" : "Agregar nueva materia"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-3" controlId="subjectName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Matemática"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="subjectYear">
              <Form.Label>Año</Form.Label>
              <Form.Select
                name="year"
                value={formData.year}
                onChange={handleChange}
              >
                <option>Año 1</option>
                <option>Año 2</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="subjectDuration">
              <Form.Label>Duración (en meses)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 6"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="subjectDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Breve descripción de la materia"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
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
            {subjectId ? "Guardar cambios" : "Crear"}
          </Button>
        </Modal.Footer>
    </Modal>
  );
}

export default SubjectModal;
