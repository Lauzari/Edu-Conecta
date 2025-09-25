import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import './professorForm.css';
const ProfessorFrom = () => {

  const [values, setValues] = useState({
    nombre: "",
    lastName: "",
    experience: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario válido ✅", values);
    // acá iría tu lógica para enviar los datos (fetch/axios/etc.)
  };

  return (
    <div className='Professor'>
      <div className='Professor-form'>
        <FaArrowLeft style={{ fontSize: '30px', color: 'black', marginTop: '20px', marginLeft: '30px',cursor: 'pointer' }} onClick={() => window.location.href = '/'} />
        <div className='Professor-form-content'>
          <h1>Sumate a nuestro equipo de docentes!</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input type="text"
                name="nombre"
                value={values.nombre}
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
              <textarea name="" id="" placeholder='Experiencia..'></textarea>
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