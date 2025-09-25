import React, { useState } from 'react';
import './register.css';
import validateRegister from './loginhelper';

const Register = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegister(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Formulario válido ✅", values);
      // acá iría tu lógica para enviar los datos (fetch/axios/etc.)
    }
  };


  return (
    <div className="register">
      <div className='register-form'>
        <div className='register-form-content'>
          <h1>Bienvenido a Edu-Conecta</h1>
          <p>Porfavor completa los campos del registro</p>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input type="text"
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                placeholder="Nombre"
              />
              {errors.nombre && <span className="error">{errors.nombre}</span>}
            </div>

            <div className='form-group'>
              <input type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className='form-group'>
            <input type="password"
              placeholder="Contraseña"
              name='password'
              value={values.password}
              onChange={handleChange} 
            />
            {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className='form-group'>
            <input type="password"
              name='confirmPassword'
              value={values.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar contraseña"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>

            <div className='form-group'>
              <label htmlFor="" className='check-box'>
                <input type="checkbox"
                name='terms'
                value={values.terms}
                onChange={handleChange}
                /><p>Acepto los términos y condiciones</p>
              </label>
              {errors.terms && <span className="error">{errors.terms}</span>}
            </div>

            <button className='submit-register' type="submit">Registrar</button>
          </form>
          <p>Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
        </div>
      </div>

      <div className='register-img'>
        <img src="/images/Img-register.jpg" alt="Registro" />
      </div>
    </div>
  );
};

export default Register;