export function validateSubject(formData) {
  const { name, year, duration, description } = formData;

  if (!name.trim() || !year.trim() || !duration || !description.trim()) {
    return { valid: false, message: "Por favor completá todos los campos." };
  }

  if (isNaN(duration) || Number(duration) <= 0) {
    return {
      valid: false,
      message: "La duración debe ser un número mayor a 0.",
    };
  }

  return { valid: true };
}
