export default function validateRegister(values) {
  const errors = {};

  if (!values.Name.trim()) {
    errors.Name = "El nombre es obligatorio";
  } else if (values.Name.length < 3) {
    errors.Name = "El nombre debe tener al menos 3 caracteres";
  }


  if (!values.Email) {
    errors.Email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(values.Email)) {
    errors.Email = "El email no es válido";
  }

  if (!values.birthdate) {
    errors.birthdate = "La fecha de nacimiento es obligatoria";
  } else if (values.birthdate.length < 10) {
    errors.birthdate = "La fecha de nacimiento debe tener al menos 10 caracteres";
  }

  if (!values.Password) {
    errors.Password = "La contraseña es obligatoria";
  } else if (values.Password.length < 6) {
    errors.Password = "La contraseña debe tener al menos 6 caracteres";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña";
  } else if (values.confirmPassword !== values.Password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  if (!values.terms) {
    errors.terms = "Debes aceptar los términos y condiciones";
  }

  return errors;
}