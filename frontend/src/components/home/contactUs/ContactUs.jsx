import React, { useState } from "react";
import { validateForm } from "./formValidations";
import { toast } from "react-toastify";
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // <-- estado para loader

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    const newErrors = validateForm(formData);
    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true); // <-- activar loader

    try {
      // Agregar prefijo al subject
      const payload = {
        ...formData,
        subject: `Contacto desde EduConecta: ${formData.subject}`
      };

      const response = await fetch(
        "https://localhost:7018/api/Mail/contactUs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Error al enviar el formulario");

      toast.success("✅ ¡Mensaje enviado con éxito!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("❌ Hubo un error al enviar el mensaje.");
    } finally {
      setIsLoading(false); // <-- desactivar loader
    }
  };

  return (
    <section className="contact-us" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-9 align-self-center">
            <div className="row">
              <div className="col-lg-12">
                <form id="contact" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <h2>Contáctate con nosotros</h2>
                    </div>
                    <div className="col-lg-4">
                      <fieldset>
                        <input
                          name="name"
                          type="text"
                          id="name"
                          placeholder="Tu nombre...*"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {errors.name && <small>{errors.name}</small>}
                      </fieldset>
                    </div>
                    <div className="col-lg-4">
                      <fieldset>
                        <input
                          name="email"
                          type="text"
                          id="email"
                          placeholder="Tu correo...*"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors.email && <small>{errors.email}</small>}
                      </fieldset>
                    </div>
                    <div className="col-lg-4">
                      <fieldset>
                        <input
                          name="subject"
                          type="text"
                          id="subject"
                          placeholder="Asunto...*"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                        {errors.subject && <small>{errors.subject}</small>}
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <textarea
                          name="message"
                          type="text"
                          className="form-control"
                          id="message"
                          placeholder="Escribe tu consulta..."
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                        {errors.message && <small>{errors.message}</small>}
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="button"
                          disabled={isLoading} // <-- deshabilitar mientras carga
                        >
                          {isLoading ? "Enviando..." : "Enviar mensaje"} {/* <-- loader */}
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="right-info">
              <ul>
                <li>
                  <h6>Número de teléfono</h6>
                  <span>010-020-0340</span>
                </li>
                <li>
                  <h6>Correo electrónico</h6>
                  <span>info@educonecta.edu</span>
                </li>
                <li>
                  <h6>Dirección</h6>
                  <span>Zeballos 1341, Rosario, Santa Fe - Argentina</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
