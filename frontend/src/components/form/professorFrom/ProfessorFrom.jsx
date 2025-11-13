import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import './professorForm.css';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../hooks/useAuth.js";

const ProfessorFrom = () => {
  const { token, userId, name } = useAuth();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const [values, setValues] = useState({
    nombre: "",
    lastName: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (name) {
      setValues((prev) => ({ ...prev, nombre: name }));
    }
  }, [name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.nombre || !values.description) {
      setMessage("Por favor completá todos los campos.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${apiUrl}/api/ProfessorRequest/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: values.description,
          applicantId: userId,
        }),
      });

      const text = await response.text();

      if (response.ok) {
        toast("✨ Tu solicitud fue enviada con éxito!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
        setTimeout(() => navigate("/"), 3000);
      } else {
        let errorMessage = "No se pudo enviar la solicitud.";
        if (text) {
          try {
            const errorData = JSON.parse(text);
            errorMessage = errorData.message || errorMessage;
          } catch {
            console.warn("⚠️ Respuesta no es JSON:", text);
          }
        }

        toast(`❌ Error: ${errorMessage}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast("❌ Error al enviar la solicitud", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className='Professor'>
      <div className='Professor-form'>
        <FaArrowLeft
          style={{
            fontSize: '30px',
            color: 'black',
            marginTop: '20px',
            marginLeft: '30px',
            cursor: 'pointer',
          }}
          onClick={() => window.location.href = '/'}
        />

        <div className='Professor-form-content'>
          <h1>¡Sumate a nuestro equipo de docentes!</h1>
          <p className="Professor-subtitle">
            Contanos brevemente tu experiencia en la docencia o por qué te gustaría ser parte del cuerpo docente de <strong>EduConecta</strong>. Nuestro equipo revisará tu solicitud y te responderá a la brevedad.
          </p>

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                disabled
              />
            </div>

            <div className='form-group-text'>
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Contanos un poco sobre tu experiencia o motivación..."
              ></textarea>
            </div>

            <button
              className='submit-register-professor'
              type="submit"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Aplicar"}
            </button>

            {message && <p style={{ marginTop: "10px" }}>{message}</p>}
          </form>
        </div>
      </div>

      <div className='professor-img'>
        <img src="/images/Form-professor.jpeg" alt="Form-professor" />
      </div>
    </div>
  );
};

export default ProfessorFrom;
