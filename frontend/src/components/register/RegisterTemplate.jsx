import React, { useState } from 'react';
import './register.css';
import validateRegister from './loginhelper';
import LoginModal from '../loginModal/LoginModal';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    Name: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    terms: false,
    birthdate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit  = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegister(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Formulario válido ✅", values);
      try{
        //puse mi localhost porque no me tomaba el puerto de appsettings.json, hay que modificarlo 
        const response = await fetch("http://localhost:5253/User/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email: values.Email,
            Password: values.Password,
            Name: values.Name,
            BirthDate: values.birthdate,
          }),
        });

        if (response.ok) {
          console.log("Datos enviados correctamente");
          navigate("/")
        } else {
          console.log("Error al enviar los datos");
        }

      }catch(error){
        console.log(error);
      }
      // acá iría tu lógica para enviar los datos (fetch/axios/etc.)
    }
  };


  return (
    <div className="register">
      <div className='register-form'>
        <div className='register-form-content'>
          <h1>Bienvenido a EduConecta</h1>
          <p>Por favor completa los campos del registro</p>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input type="text"
                name="Name"
                value={values.Name}
                onChange={handleChange}
                placeholder="Nombre"
              />
              {errors.Name && <span className="error">{errors.Name}</span>}
            </div>

            <div className='form-group'>
              <input type="text"
                name="Email"
                value={values.Email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.Email && <span className="error">{errors.Email}</span>}
            </div>

            <div className='form-group'>
              <input type="date"
                name="birthdate"
                value={values.birthdate}
                onChange={handleChange}
                placeholder="Fecha de nacimiento"
              />
              {errors.birthdate && <span className="error">{errors.birthdate}</span>}
            </div>

            <div className='form-group'>
              <input type="password"
                placeholder="Contraseña"
                name='Password'
                value={values.Password}
                onChange={handleChange}
              />
              {errors.Password && <span className="error">{errors.Password}</span>}
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
          <p>Ya tienes una cuenta? <button onClick={() => setShowLogin(true)}>Iniciar sesión</button></p>
        </div>
      </div>

      <div className='register-img'>
        <img src="/images/Img-register.jpg" alt="Registro" />
      </div>
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Register;