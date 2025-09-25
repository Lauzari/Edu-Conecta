export default function validateRegister(values) {
  const errors = {};

  if (!values.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio";
  } else if (values.nombre.length < 3) {
    errors.nombre = "El nombre debe tener al menos 3 caracteres";
  }


  if (!values.email) {
    errors.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no es válido";
  }

  if (!values.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  if (!values.terms) {
    errors.terms = "Debes aceptar los términos y condiciones";
  }

  return errors;
}