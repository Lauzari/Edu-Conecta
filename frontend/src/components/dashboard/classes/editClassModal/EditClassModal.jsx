import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function EditClassModal({ show, onHide, classId, onSave }) {
  const [formData, setFormData] = useState({
    subjectId: "",
    teacherName: "",
    shift: "",
    startDate: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) {
        // HACER REQUEST A API
      const dummySubjects = [
        { id: 1, name: "Matemática" },
        { id: 2, name: "Lengua y Literatura" },
        { id: 3, name: "Historia" },
        { id: 4, name: "Inglés" },
      ];
      setSubjects(dummySubjects);
    }
  }, [show]);

  useEffect(() => {
    if (show && classId) {
        //HACER REQUEST A API
      const dummyClassData = {
        id: classId,
        subjectId: 2,
        teacherName: "María López",
        shift: "Tarde",
        startDate: "2025-08-20",
      };
      setFormData(dummyClassData);
    }
  }, [show, classId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSave = () => {
    if (!formData.subjectId || !formData.shift || !formData.startDate) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    onSave(formData);
    onHide();
  };

  const handleCancel = () => {
    setError("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar clase</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted mb-3">
          Los detalles de cada clase se pueden visualizar en la sección{" "}
          <strong>Cursos</strong>.
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group className="mb-3" controlId="classSubject">
            <Form.Label>Materia</Form.Label>
            <Form.Select
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
            >
              <option value="">Seleccionar materia</option>
              {subjects.map((subj) => (
                <option key={subj.id} value={subj.id}>
                  {subj.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="teacherName">
            <Form.Label>Docente</Form.Label>
            <Form.Control
              type="text"
              name="teacherName"
              value={formData.teacherName}
              readOnly
              plaintext={false}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="classShift">
            <Form.Label>Turno</Form.Label>
            <Form.Select
              name="shift"
              value={formData.shift}
              onChange={handleChange}
            >
              <option value="">Seleccionar turno</option>
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Noche">Noche</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
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
          Editar clase
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditClassModal;
