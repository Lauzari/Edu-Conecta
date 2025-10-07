import React from "react";
import { Modal, Button } from "react-bootstrap";

/*
Modal de confirmación reutilizable
 Props:
 - show (bool): controla si el modal está visible
 - onHide (func): función para cerrar el modal
 - title (string): título del modal
 - message (string): texto de la pregunta o mensaje
 - confirmText (string): texto del botón de confirmación
 - cancelText (string): texto del botón de cancelación
 - onConfirm (func): acción a ejecutar al confirmar
 */
function ConfirmModal({
  show,
  onHide,
  title,
  message,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  onConfirm,
}) {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelText}
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
