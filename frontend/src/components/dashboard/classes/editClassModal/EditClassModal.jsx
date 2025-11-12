import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../../../hooks/useAuth.js";

function EditClassModal({ show, onHide, classId, onSave }) {
  const [formData, setFormData] = useState({
    subjectId: "",
    classDescription: "",
    teacherId: "",
    teacherName: "",
    zoomLink: "",
    shift: "",
    startDate: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  const { token } = useAuth(); 

  useEffect(() => {
    if (show) {
      const fetchSubjects = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/Subject`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) throw new Error("Error al cargar materias");
          const data = await response.json();
          setSubjects(data);
        } catch (err) {
          console.error(err);
          setSubjects([]);
        }
      };

      fetchSubjects();
    }
  }, [show]);

  useEffect(() => {
    if (show && classId) {
      const fetchClass = async () => {
        try {
          const response = await fetch(`${apiUrl}/Class/GetClass?id=${classId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!response.ok) throw new Error("Error al cargar clase");
          const cls = await response.json();

          setFormData({
            subjectId: cls.subjectId,
            classDescription: cls.classDescription || "",
            teacherId: cls.teacherId,
            teacherName: cls.teacher?.name || "",
            zoomLink: cls.zoomLink || "",
            shift: cls.classShift,
            startDate: cls.startDate ? cls.startDate.split("T")[0] : "",
          });
        } catch (err) {
          console.error(err);
        }
      };

      fetchClass();
    }
  }, [show, classId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSave = async () => {
    if (!formData.subjectId || !formData.shift || !formData.startDate) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const requestBody = {
        Id: classId,
        SubjectId: parseInt(formData.subjectId),
        ClassDescription: formData.classDescription,
        TeacherId: formData.teacherId,
        ZoomLink: formData.zoomLink,
        ClassShift: formData.shift,
        StartDate: formData.startDate,
      };

      const response = await fetch(`${apiUrl}/Class`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la clase");
      }

      const updatedClass = await response.json();

      // Mapear a formato que espera la tabla de clases
      const formatted = {
        id: updatedClass.classId,
        subjectName: updatedClass.subject?.name || "",
        teacherName: updatedClass.teacher?.fullName || "",
        classShift: updatedClass.classShift,
        startDate: updatedClass.startDate
          ? updatedClass.startDate.split("T")[0]
          : "",
      };

      onSave(formatted);
      onHide();
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar la clase.");
    }
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

          <Form.Group className="mb-3" controlId="zoomLink">
            <Form.Label>Link de Zoom</Form.Label>
            <Form.Control
              type="text"
              name="zoomLink"
              value={formData.zoomLink}
              onChange={handleChange}
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
              <option value="Morning">Mañana</option>
              <option value="Afternoon">Tarde</option>
              <option value="Evening">Noche</option>
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
