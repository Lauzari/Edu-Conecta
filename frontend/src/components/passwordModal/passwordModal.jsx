import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { validatePasswordFields } from './password.js';

function PasswordModal({ show, handleClose }) {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSave = () => {
        const validationErrors = validatePasswordFields(currentPassword, newPassword);

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        console.log("Guardando nueva contraseña...");
        handleClose();
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar la contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errors.length > 0 && (
                        <div style={{ color: "red", marginBottom: "10px" }}>
                            {errors.map((err, i) => (
                                <p key={i} style={{ margin: 0, color: "red" }}>
                                    {err}
                                </p>
                            ))}
                        </div>
                    )}

                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Contraseña actual</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingrese su contraseña"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Nueva contraseña</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Ingrese su nueva contraseña'
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PasswordModal;