import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import courses from '../../../data/courses';
import { useParams } from 'react-router-dom';

function EditClassModal({ show, onHide }) {
  const { id } = useParams();

  const course = courses.find((c) => c.id === parseInt(id));

  const [formData, setFormData] = useState({
    nameSubjet: "",
    description: "",
    startDate: "",
    endDate: "",
    hours: "",
  });

  
  useEffect(() => {
    if (course) {
      setFormData({
        nameSubjet: course.title || "",
        description: course.description || "",
        startDate: course.startDate || "",
        endDate: course.endDate || "",
        hours: course.hours || "",
      });
    }
  }, [course, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log("Datos editados:", formData);
    onHide(); 
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
