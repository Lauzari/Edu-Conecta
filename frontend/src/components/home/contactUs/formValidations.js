// formValidations.js

export function validateName(name) {
  if (!name.trim()) return "El nombre es obligatorio.";
  if (name.length < 2) return "El nombre debe tener al menos 2 caracteres.";
  return null;
}

export function validateEmail(email) {
  if (!email.trim()) return "El correo es obligatorio.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "El correo no es válido.";
  return null;
}

export function validateSubject(subject) {
  if (!subject.trim()) return "El asunto es obligatorio.";
  if (subject.length < 3) return "El asunto debe tener al menos 3 caracteres.";
  return null;
}

export function validateMessage(message) {
  if (!message.trim()) return "El mensaje es obligatorio.";
  if (message.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
  return null;
}

export function validateForm({ name, email, subject, message }) {
  return {
    name: validateName(name),
    email: validateEmail(email),
    subject: validateSubject(subject),
    message: validateMessage(message),
  };
}
