import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import './professorForm.css';

const ProfessorForm = () => {

  const [values, setValues] = useState({
    nombre: "",
    lastName: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.nombre || !values.lastName || !values.experience) {
      setMessage("Por favor completá todos los campos.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:7018/api/professors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setMessage("✅ Tu postulación fue enviada correctamente.");
        setValues({ nombre: "", lastName: "", experience: "" });
      } else {
        const errorData = await response.json();
        setMessage(`❌ Error: ${errorData.message || "No se pudo enviar la solicitud."}`);
      }
    } catch (error) {
      setMessage("⚠️ Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='Professor'>
      <div className='Professor-form'>
        <FaArrowLeft
          style={{ fontSize: '30px', color: 'black', marginTop: '20px', marginLeft: '30px', cursor: 'pointer' }}
          onClick={() => window.location.href = '/'}
        />

        <div className='Professor-form-content'>
          <h1>Sumate a nuestro equipo de docentes!</h1>

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type="text"
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                placeholder="Nombre"
              />
            </div>

            <div className='form-group'>
              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                placeholder="Apellido"
              />
            </div>

            <div className='form-group-text'>
              <textarea
                name="experience"
                value={values.experience}
                onChange={handleChange}
                placeholder="Experiencia..."
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

export default ProfessorForm;
