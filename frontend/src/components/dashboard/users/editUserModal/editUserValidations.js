
export function validateUserData(userData) {
  const errors = {};

  if (!userData.name || userData.name.trim() === "") {
    errors.name = "El nombre es obligatorio.";
  }

  if (!userData.email || userData.email.trim() === "") {
    errors.email = "El correo electrónico es obligatorio.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      errors.email = "El formato del correo electrónico no es válido.";
    }
  }

  if (!userData.birthDate) {
    errors.birthDate = "La fecha de nacimiento es obligatoria.";
  } else {
    const birthDate = new Date(userData.birthDate);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      errors.birthDate = "La fecha de nacimiento no es válida.";
    } else if (birthDate > today) {
      errors.birthDate = "La fecha de nacimiento no puede ser futura.";
    } else {
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 10) {
        errors.birthDate = "La edad mínima debe ser de 10 años.";
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}
