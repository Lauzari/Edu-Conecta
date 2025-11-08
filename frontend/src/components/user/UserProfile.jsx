import React, { useState, useContext, useEffect } from "react";
import "./userProfile.css";
import { jwtDecode } from "jwt-decode";
// import coursesData from "../../data/courses.js";
import { useAuth } from "../../hooks/useAuth.js"
import PasswordModal from "../passwordModal/passwordModal.jsx";
import { FaUserCircle, FaBell, FaEdit } from "react-icons/fa";

function UserProfile() {
    // const [courses, setCourses] = useState(coursesData);
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState({});
    const { token, id } = useAuth();
    const [show, setShow] = useState(false);

    // const handleDelete = (id) => {
    //     // elimina el curso con ese id
    //     setCourses(courses.filter((c) => c.id !== id));
    // };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    // const limitedCourses = courses.slice(0, 2);

    const toggleNotifications = () => setOpen(!open);

    const notifications = [
        { id: 1, text: "Nueva solicitud", visto: false },
        { id: 2, text: "Nueva solicitud", visto: true },
    ];

    // Obtener datos del usuario
    useEffect(() => {
        const fetchUserProfile = async () => {
            const decodedToken = jwtDecode(token);
            console.log("Token recibido del backend:", token);
            console.log("Token decodificado:", decodedToken);
            try {
                const res = await fetch(`https://localhost:7169/User/completeUserInfo?id=${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    console.error("Error HTTP:", res.status);
                    throw new Error("Error al obtener datos del usuario");
                }

                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div style={{ backgroundColor: "#3b3fbd" }}>
            {/* "#1F262C" */}
            <div className="profile-card">
                <div className="profile-header">
                    <button className="notification-btn" onClick={toggleNotifications}>
                        <FaBell className="bell-icon" />
                        <span>Solicitudes para profesor</span>
                    </button>
                    {open && (
                        <div className="notification-dropdown">
                            {user.requests && user.requests.length > 0 ? (
                                user.requests.map((req) => (
                                    <div
                                        key={req.id}
                                        className={`notification-item ${req.status === "Pending" ? "no-visto" : "visto"
                                            }`}
                                    >
                                        <span>Estado:</span>
                                        <span className="estado">
                                            {req.status === "Pending" ? "Pendiente" : req.status}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p>No tenés solicitudes de profesor.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="profile-info">
                    <div className="profile-avatar">
                        <FaUserCircle className="avatar-icon" />
                        <FaEdit className="edit-avatar" />
                    </div>

                    <div className="profile-details">
                        <p className="label">Nombre</p>
                        <h2 className="name">
                            {user.name} <FaEdit className="edit-icon" />
                        </h2>

                        <p className="label">Email</p>
                        <p className="email">{user.email}</p>

                        <a href="#" className="edit-password" onClick={(e) => { e.preventDefault(); setShow(true) }}>
                            Editar Contraseña
                        </a>
                    </div>
                </div>
            </div>
            {/* <div className="course-card">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <h3>Mis Materias</h3>
                    </div>
                    <div className="edit-course">
                        <FaEdit onClick={toggleEditMode} style={{ fontSize: "20px", color: "#1a3c8b", marginLeft: "30px", cursor: "pointer" }} />
                    </div>
                </div>

                <div className="course-card-content">
                    {limitedCourses.length > 0 ? (
                        limitedCourses.map((course) => (
                            <div className="course-card-item" key={course.id}>
                                {editMode && (
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(course.id)}
                                    >
                                        ❌
                                    </button>
                                )}
                                <img src={course.img} alt={course.title} className="course-img" />
                                <div className="course-content">
                                    <h3 className="course-title">{course.title}</h3>
                                </div>
                            </div>
                        ))

                    ) : (
                        <p>No tienes materias por el momento...</p>
                    )}
                </div>
            </div> */}
            {show && <PasswordModal show={show} handleClose={() => setShow(false)} />}
        </div>
    );
}

export default UserProfile;
