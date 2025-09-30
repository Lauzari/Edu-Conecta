// Validates email format
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "El email es obligatorio";
  }
  if (!regex.test(email)) {
    return "El email no es válido";
  }
  return "";
}

// Validates password length
// !! Should we add another validation (uppercase, numbers, etc)?
export function validatePassword(password) {
  if (!password) {
    return "La contraseña es obligatoria";
  }
  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres";
  }
  return "";
}

// Function that validates both fields and returns errors
export function validateLoginForm({ email, password }) {
  const errors = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  return errors;
}
