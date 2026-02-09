import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import './professorForm.css';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../hooks/useAuth.js";

const ProfessorFrom = () => {
  const { token, name, userId } = useAuth();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [values, setValues] = useState({ nombre: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  
  const notify = (msg, type = "info") => {
    const config = { 
      position: "top-right", 
      autoClose: 3000, 
      theme: "light", 
      transition: Bounce 
    };
    if (type === "success") toast.success(msg, config);
    else toast(msg, config);
  };

 
  useEffect(() => {
    const checkUserStatus = async () => {
      if (!token) return;
      
      try {
        const response = await fetch(`${apiUrl}/requestsByUserId`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          const hasPending = data.some(r => r.status === "Pending");
          if (hasPending) {
            setAlreadyRequested(true);
          
          }
        }
      } catch (error) {
        console.error("Error verificando estado:", error);
      }
    };

    checkUserStatus();
    if (name) setValues((prev) => ({ ...prev, nombre: name }));
    
   
    return () => setAlreadyRequested(false);
  }, [apiUrl, token, userId, name]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.description.trim()) {
      notify("❌ Por favor completá todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/ProfessorRequest/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: values.description }),
      });

      if (response.ok) {
       
        notify("✨ Tu solicitud fue enviada con éxito!", "success");
        setAlreadyRequested(true);
        setTimeout(() => navigate("/"), 4000);
      } else {
        const text = await response.text();
      
        if (response.status === 409 || response.status === 500) {
          setAlreadyRequested(true);
        } else {
          notify(`❌ Error: ${text || "No se pudo enviar"}`);
        }
      }
    } catch (error) {
      notify("❌ Error de conexión al enviar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='Professor'>
      <div className='Professor-form'>
        <FaArrowLeft
          style={{ fontSize: '20px', cursor: 'pointer', margin: '25px 10 10 30px', color: 'black' }}
          onClick={() => navigate('/')}
        />

        <div className='Professor-form-content'>
          <h1>¡Gracias por tu interés en ser parte de nuestro equipo docente!</h1>

          {alreadyRequested ? (
           
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p style={{ color: "#1ec05c", fontWeight: "bold", fontSize: "1.2rem" }}>
                  Solo puedes enviarnos una solicitud. Tu solicitud ya está en revisión.
              </p>
              <p style={{ color: "#555", marginTop: "10px" }}>
                
                Estamos evaluando tu perfil. Te avisaremos por email pronto.
              </p>
              <button 
                onClick={() => navigate('/')} 
                className='submit-register-professor'
                style={{ marginTop: '20px' }}
              >
                Volver al Inicio
              </button>
            </div>
          ) : (
            <>
              <p className="Professor-subtitle">
                Contanos brevemente tu experiencia en la docencia. Nuestro equipo revisará tu solicitud y te responderá a la brevedad.
              </p>

              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label>Nombre</label>
                  <input name="nombre" value={values.nombre} disabled />
                </div>

                <div className='form-group-text'>
                  <label>Descripción</label>
                  <textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Contanos un poco sobre tu experiencia..."
                  />
                </div>

                <button className='submit-register-professor' type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Aplicar"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <div className='professor-img'>
        <img src="/images/Form-professor.jpeg" alt="Form-professor" />
      </div>
    </div>
  );
};

export default ProfessorFrom;