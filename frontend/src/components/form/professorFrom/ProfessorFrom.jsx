import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import './professorForm.css';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ProfessorFrom = () => {

  const [values, setValues] = useState({
    Name: "",
    lastName: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    e.preventDefault();
    console.log("Formulario válido ✅", values);

    //falta agregar el token y el id del usuario
    try {
      const response = await fetch('http://localhost:5253/api/ProfessorRequest/5', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Description: values.description,
          ApplicantId: 5,
        }),
      });

      if (response.ok) {
        toast('✨ Tu solicitud fue enviada con éxito!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
        setTimeout(() => navigate("/"), 3000);
      } else {
        const text = await response.text();
        throw new Error(`Error ${response.status}: ${text}`);
      }

    } catch (error) {
      toast(' Error al enviar la solicitud', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className='Professor'>
      <div className='Professor-form'>
        <FaArrowLeft style={{ fontSize: '30px', color: 'black', marginTop: '20px', marginLeft: '30px', cursor: 'pointer' }} onClick={() => window.location.href = '/'} />
        <div className='Professor-form-content'>
          <h1>Sumate a nuestro equipo de docentes!</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input type="text"
                name="Name"
                value={values.Name}
                onChange={handleChange}
                placeholder="Nombre"
              />
            </div>

            <div className='form-group'>
              <input type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                placeholder="Apellido"
              />
            </div>

            <div className='form-group-text'>
              <textarea value={values.description} onChange={handleChange} name="description" id="" placeholder='Experiencia..'></textarea>
            </div>

            <button className='submit-register-professor' type="submit">Aplicar</button>
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