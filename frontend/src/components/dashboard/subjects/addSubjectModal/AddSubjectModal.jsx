import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { validateSubject } from "./validateSubjectModal.js";
import { useAuth } from "../../../../hooks/useAuth.js";

function SubjectModal({ show, onHide, onSave, subjectId }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    duration: "",
    description: "",
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const { token } = useAuth();
  
  // === FETCH SUBJECT BY ID ===
  useEffect(() => {
    if (show && subjectId) {
      const fetchSubject = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `${apiUrl}/api/Subject/${subjectId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok) throw new Error("Error al obtener la materia");
          const subj = await response.json();

          setFormData({
            name: subj.name,
            year: `Año ${subj.year}`,
            duration: subj.duration,
            description: subj.description,
          });
        } catch (err) {
          console.error(err);
          setError("No se pudo cargar la materia");
        } finally {
          setLoading(false);
        }
      };

      fetchSubject();
    } else if (show && !subjectId) {
      // Creation mode
      setFormData({ name: "", year: "1", duration: "", description: "" });
      setError("");
    }
  }, [subjectId, show, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSave = async () => {
    const validation = validateSubject(formData);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        year: parseInt(formData.year.replace("Año ", "")),
        description: formData.description,
        duration: parseInt(formData.duration),
      };

      let response;
      let body;
      let url = "";
      if (subjectId) {
        body = JSON.stringify({ id: subjectId, ...payload });
        url = `${apiUrl}/api/Subject/${subjectId}`;
        // PUT / Update
        response = await fetch(
          `${apiUrl}/api/Subject/${subjectId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id: subjectId, ...payload }),
          }
        );
      } else {
        body = JSON.stringify(payload);
        url = `${apiUrl}/api/Subject`;
        // POST / Create
        response = await fetch(`${apiUrl}/api/Subject`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) throw new Error("Error al guardar la materia");

      const savedSubject = await response.json();

      // Tomar id de backend correctamente (Id o id)
      const updatedSubject = {
        id: savedSubject.id ?? savedSubject.Id,
        name: savedSubject.name,
        year: `${savedSubject.year}`,
        duration: savedSubject.duration,
        description: savedSubject.description,
      };

      onSave(updatedSubject, subjectId);
      onHide();
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar la materia");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", year: "1", duration: "", description: "" });
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
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
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
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          variant="success"
          onClick={handleSave}
          style={{ backgroundColor: "#039a51", borderColor: "#039a51" }}
          disabled={loading}
        >
          {subjectId ? "Guardar cambios" : "Crear"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SubjectModal;
