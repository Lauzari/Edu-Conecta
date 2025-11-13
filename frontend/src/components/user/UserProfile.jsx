import React, { useState, useContext, useEffect } from "react";
import "./userProfile.css";
import { useAuth } from "../../hooks/useAuth.js";
import PasswordModal from "../passwordModal/passwordModal.jsx";
import { FaUserCircle, FaBell, FaEdit } from "react-icons/fa";
import SubjectCard from "../subjectCard/SubjectCard.jsx";

function UserProfile() {
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const { token, userId, isReady  } = useAuth();
  const [show, setShow] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [editableName, setEditableName] = useState("");

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  const apiUrl = import.meta.env.VITE_API_URL;

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const toggleNotifications = () => setOpen(!open);


  const handleEditNameClick = () => {
      setEditableName(user.name); // Carga el nombre actual en el input
      setIsEditingName(true);
  };

  

  useEffect(() => {
    console.log("Token que se envía:", token);
console.log("UserId:", userId);
console.log("URL:", `${apiUrl}/User/completeUserInfo?id=${userId}`);
    if (!isReady || !token || !userId) return;

    const fetchUserProfile = async () => {
      if (!token || !userId) return; 
      try {
        const res = await fetch(`${apiUrl}/User/completeUserInfo?id=${userId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
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
  }, [isReady,token, userId]); 


  const handleSaveName = async () => {
    console.log("Token que se está enviando:", token);
    setUser(prevUser => ({ ...prevUser, name: editableName }));
    setIsEditingName(false);

    try{
        const res = await fetch(`${apiUrl}/User/update`,{
          method: "PUT",
          header :{
            "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
          userId: userId,
          name: editableName 
        }) 
      });
      if (!res.ok){
        console.error("Error al actualizar el nombre");
        setUser(prevUser => ({ ...prevUser, name: user.name }));
      }
    }catch(error){
      console.error(error);
      setUser(prevUser => ({ ...prevUser, name: user.name }));
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
  };

  return (
    <div style={{ backgroundColor: "#3b3fbd" }}>
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
            {userInitial}
          </div>

          <div className="profile-details">
            <p className="label">Nombre</p>
            {isEditingName ? (
              <div className="edit-name-container">
                <input
                  type="text"
                  className="name-input"
                  value={editableName}
                  onChange={(e) => setEditableName(e.target.value)}
                  autoFocus // Pone el cursor en el input automáticamente
                />
                <button onClick={handleSaveName} className="save-btn">✓</button>
                <button onClick={handleCancelEdit} className="cancel-btn">❌</button>
              </div>
            ) : (
              // MODO VISTA: Muestra el nombre y el ícono
              <h2 className="name">
                {user.name} 
                <FaEdit 
                  className="edit-icon" 
                  onClick={handleEditNameClick} // Llama a la nueva función
                />
              </h2>
            )}
            <p className="label">Email</p>
            <p className="email">{user.email}</p>

            <a
              href="#"
              className="edit-password"
              onClick={(e) => {
                e.preventDefault();
                setShow(true);
              }}
            >
              Editar Contraseña
            </a>
          </div>
        </div>
      </div>
      <div className="course-card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h3>Mis Materias</h3>
          </div>
          <div className="edit-course">
            <FaEdit
              onClick={toggleEditMode}
              style={{
                fontSize: "20px",
                color: "#1a3c8b",
                marginLeft: "30px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        <div className="course-card-content">
          {user.classes && user.classes.length > 0 ? (
            user.classes.map((cls) => (
              <div className="course-card-item" key={cls.classId}>
                {editMode && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(cls.classId)}
                  >
                    ❌
                  </button>
                )}

                <SubjectCard
                  img="/images/subjects/default.jpg"
                  title={cls.subject.name}
                  description={`Turno: ${cls.classShift} | Desde: ${new Date(
                    cls.startDate
                  ).toLocaleDateString()} Hasta: ${new Date(
                    cls.endDate
                  ).toLocaleDateString()}`}
                  onClick={() => window.open("/courses/" + cls.classId)}
                />
              </div>
            ))
          ) : (
            <p>No tienes materias por el momento...</p>
          )}

        </div>
      </div>
      {show && <PasswordModal show={show} apiUrl={apiUrl} token={token}  handleClose={() => setShow(false)} />}
    </div>
  );
}

export default UserProfile;
