import React from "react";
import { Modal, Button } from "react-bootstrap";

/*
Reusable Confirmation Modal
 Props:
 - show (bool): controls if the modal is visible or not
 - onHide (func): function to close the modal
 - title (string): title of the modal
 - message (string): text of the question or message
 - confirmText (string): text for the confirmation button
 - cancelText (string): text for the cancel button
 - onConfirm (func): action excecuted when the confirmation button is selected
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
