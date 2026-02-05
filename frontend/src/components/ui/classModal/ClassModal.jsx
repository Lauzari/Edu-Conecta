import { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useAuth } from "../../../hooks/useAuth";
import coverImages from "../../../data/coverImages";

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
    coverImage: "",
    classShift: "Morning",
    startDate: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  const [showValidationError, setShowValidationError] = useState(false);

  useEffect(() => {
    if (!show) {
      setShowValidationError(false);
      setError(null);
    }
  }, [show]);

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
        coverImage: classToEdit.coverImage || "",
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
        coverImage: "",
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

    setShowValidationError(false);
  };
  const isStartDateValid = () => {
    if (!formData.startDate) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(formData.startDate);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate >= today;
  };

  const isFormValid = () => {
    return (
      formData.subjectId &&
      formData.classDescription.trim() &&
      formData.zoomLink.trim() && 
      formData.classShift &&
      formData.coverImage &&
      formData.startDate &&
      isStartDateValid()
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setShowValidationError(true);
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const classData = {
        SubjectId: parseInt(formData.subjectId),
        ClassDescription: formData.classDescription,
        TeacherId: userId,
        ZoomLink: formData.zoomLink,
        CoverImage: formData.coverImage,
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
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? "Editar Clase" : "Crear Nueva Clase"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
                isInvalid={showValidationError && !formData.subjectId}
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

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="classDescription"
              value={formData.classDescription}
              onChange={handleChange}
              placeholder="Descripción detallada de la clase..."
              isInvalid={
                showValidationError && !formData.classDescription.trim()
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Link de Zoom</Form.Label>
            <Form.Control
              type="url"
              name="zoomLink"
              value={formData.zoomLink}
              onChange={handleChange}
              placeholder="https://zoom.us/..."
              isInvalid={showValidationError && !formData.zoomLink.trim()}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Turno</Form.Label>
            <Form.Select
              name="classShift"
              value={formData.classShift}
              onChange={handleChange}
              isInvalid={showValidationError && !formData.classShift}
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
              isInvalid={
                showValidationError &&
                (!formData.startDate || !isStartDateValid())
              }
              min={new Date().toISOString().split("T")[0]}
            />
            {showValidationError && !isStartDateValid() && (
              <span style={{ color: "red", margin: "0 0 0 0.9rem" }}>
                Tiene que ingresar una fecha válida
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen de portada</Form.Label>
            {loadingSubjects ? (
              <div className="text-muted">Cargando imágenes...</div>
            ) : (
              <Form.Select
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                isInvalid={showValidationError && !formData.coverImage}
              >
                <option value="">Seleccionar imagen...</option>
                {coverImages.map((coverImage) => (
                  <option key={coverImage.id} value={coverImage.image}>
                    {coverImage.name}
                  </option>
                ))}
              </Form.Select>
            )}

            <div
              style={{
                marginTop: "12px",
                width: "100%",
                height: "15rem",
                borderRadius: "8px",
                backgroundColor: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                border: "1px dashed #9ca3af",
              }}
            >
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt="Vista previa portada"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span style={{ color: "#6b7280", fontWeight: 500 }}>
                  Vista previa
                </span>
              )}
            </div>
          </Form.Group>
        </Form>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {showValidationError && (
          <div className="alert alert-warning">
            Debe completar todos los campos correctamente antes de continuar.
          </div>
        )}
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
