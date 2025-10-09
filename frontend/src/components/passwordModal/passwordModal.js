export function validatePasswordFields(current, next) {
  const errors = [];

  if (!current.trim()) {
    errors.push("La contraseña actual no puede estar vacía.");
  }

   if (!next.trim()) {
    errors.push("La nueva contraseña no puede estar vacía.");
  } else if (next.length < 6) {
    errors.push("La nueva contraseña debe tener al menos 6 caracteres.");
  }

  return errors;
}
