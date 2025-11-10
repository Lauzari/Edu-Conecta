import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import courses from '../../../data/courses.js';
import { useParams } from 'react-router-dom';
import users from '../../../data/user.js';
import ConfirmModal from '../../ui/confirmationModal/ConfirmationModal.jsx';
import './StudentModal.css';
import './StudentOrder.js';
import { FaRegTrashAlt } from "react-icons/fa";

function StudentModal(props) {
    const { id } = useParams();

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const course = courses.find((c) => c.id === parseInt(id));
    const [students, setStudents] = useState(
        users.filter((u) => u.role === "student")
    );

    const sortedStudents = [...students].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    const groupedStudents = sortedStudents.reduce((groups, student) => {
        const firstLetter = student.name[0].toUpperCase();
        if (!groups[firstLetter]) groups[firstLetter] = [];
        groups[firstLetter].push(student);
        return groups;
    }, {});

    const handleDeleteClick = (student) => {
        setSelectedStudent(student);
        setShowConfirm(true);
    };

    const handleConfirmDelete = () => {
        setStudents(students.filter((s) => s.id !== selectedStudent.id));
        setSelectedStudent(null);
    };

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {course ? course.title : "Materia"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h4>Alumnos Inscriptos en la materia</h4>

                    <div className="students-list">
                        {Object.keys(groupedStudents).length > 0 ? (
                            Object.keys(groupedStudents).map((letter) => (
                                <div key={letter} className="student-group">
                                    <h5 className="group-letter">{letter}</h5>
                                    {groupedStudents[letter].map((student) => (
                                        <div className="student-item" key={student.id}>
                                            <img
                                                src={student.Image}
                                                alt={student.name}
                                                className="student-img"
                                            />
                                            <div className="student-info">
                                                <h5>{student.name}</h5>
                                                <p>{student.email}</p>
                                            </div>
                                            <div className='delete-user'>
                                                <button onClick={() => handleDeleteClick(student)}><FaRegTrashAlt /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <p>No hay alumnos inscriptos aún.</p>
                        )}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={props.onHide}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
            <ConfirmModal
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                title="Confirmar eliminación"
                message={
                    selectedStudent
                        ? `¿Estás segura/o de eliminar a ${selectedStudent.name}?`
                        : "¿Eliminar usuario?"
                }
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={handleConfirmDelete}
            />
        </>
    );
}

export default StudentModal;
