import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from "../../../hooks/useAuth";
import { useParams } from 'react-router-dom';

function EditClassModal({ show, onHide }) {
  const { id } = useParams();
  const { token } = useAuth(); 
  const [formData, setFormData] = useState({
    nameSubjet: "",
    description: "",
    startDate: "",
    endDate: "",
    hours: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   
    useEffect(() => {
    const fetchCourse = async () => {
      if (!show) return; 
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:7018/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (!response.ok) throw new Error("Error al obtener los datos del curso");

        const data = await response.json();

        setFormData({
          nameSubjet: data.title || "",
          description: data.description || "",
          startDate: data.startDate ? data.startDate.split("T")[0] : "",
          endDate: data.endDate ? data.endDate.split("T")[0] : "",
          hours: Array.isArray(data.hours) ? data.hours.join(", ") : data.hours || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, show, token]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSave = async () => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:7018/api/courses/${id}`, {
        method: "PUT", // or PATCH, 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
          title: formData.nameSubjet,
          description: formData.description,
          startDate: formData.startDate,
          endDate: formData.endDate,
          hours: formData.hours.split(",").map((h) => h.trim()),
        }),
      });

      if (!response.ok) throw new Error("Error al guardar los cambios");

      console.log("✅ Cambios guardados correctamente");
      onHide(); 
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Usted esta editando: {course ? course.title : "Editar materia"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de la materia</Form.Label>
            <Form.Control
              type="text"
              name="nameSubjet"
              value={formData.nameSubjet}
              onChange={handleChange}
              placeholder="Nuevo nombre"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Nueva descripción"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />

            <Form.Label>Fecha de fin</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Horarios</Form.Label>
            <Form.Control
              type="text"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              placeholder="Nuevo horario"
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditClassModal;
