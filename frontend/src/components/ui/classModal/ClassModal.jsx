import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth";

function ClassModal({ show, onHide, classToEdit = null, onSave }) {
  const { token, userId } = useAuth();
  const isEditing = !!classToEdit;

  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    id: 0,
    subjectId: "",
    classDescription: "",
    teacherId: userId,
    zoomLink: "",
    classShift: "Morning",
    startDate: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const response = await fetch(`${apiUrl}/api/Subject`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Error al cargar las materias");
        const data = await response.json();
        setSubjects(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las materias.");
      } finally {
        setLoadingSubjects(false);
      }
    };

    fetchSubjects();
  }, [token]);

  useEffect(() => {
    if (classToEdit) {
      setFormData({
        id: classToEdit.classId,
        subjectId: classToEdit.subjectId,
        classDescription: classToEdit.classDescription,
        teacherId: userId,
        zoomLink: classToEdit.zoomLink || "",
        classShift: classToEdit.classShift,
        startDate: classToEdit.startDate
          ? classToEdit.startDate.split("T")[0]
          : "",
      });
    } else {
      setFormData({
        id: 0,
        subjectId: "",
        classDescription: "",
        teacherId: userId,
        zoomLink: "",
        classShift: "Morning",
        startDate: "",
      });
    }
  }, [classToEdit, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const classData = {
        SubjectId: parseInt(formData.subjectId),
        ClassDescription: formData.classDescription,
        TeacherId: userId,
        ZoomLink: formData.zoomLink,
        ClassShift: formData.classShift,
        StartDate: formData.startDate,
      };

      if (isEditing) {
        classData.Id = formData.id;
      }

      const url = `${apiUrl}/Class`;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(classData),
      });

      if (!response.ok) throw new Error("Error al guardar la clase");

      const result = await response.json();
      onSave?.(result);
      onHide();
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? "Editar Clase" : "Crear Nueva Clase"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Materia</Form.Label>
            {loadingSubjects ? (
              <div className="text-muted">Cargando materias...</div>
            ) : (
              <Form.Select
                name="subjectId"
                value={formData.subjectId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar materia...</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          {/* 🔹 Descripción */}
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={5} // ✅ mínimo 5 líneas
              name="classDescription"
              value={formData.classDescription}
              onChange={handleChange}
              placeholder="Descripción detallada de la clase..."
              required
            />
          </Form.Group>

          {/* 🔹 Zoom */}
          <Form.Group className="mb-3">
            <Form.Label>Link de Zoom</Form.Label>
            <Form.Control
              type="url"
              name="zoomLink"
              value={formData.zoomLink}
              onChange={handleChange}
              placeholder="https://zoom.us/..."
            />
          </Form.Group>

          {/* 🔹 Turno */}
          <Form.Group className="mb-3">
            <Form.Label>Turno</Form.Label>
            <Form.Select
              name="classShift"
              value={formData.classShift}
              onChange={handleChange}
            >
              <option value="Morning">Mañana</option>
              <option value="Afternoon">Tarde</option>
              <option value="Evening">Noche</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Guardando...
            </>
          ) : isEditing ? (
            "Guardar Cambios"
          ) : (
            "Crear Clase"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClassModal;
