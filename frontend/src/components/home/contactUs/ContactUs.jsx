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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations from formValidations.js
    const newErrors = validateForm(formData);
    if (Object.values(newErrors).some((err) => err)) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:7018/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Error al enviar el formulario");
      toast.success("✅ ¡Formulario enviado con éxito!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("❌ Hubo un error al enviar el formulario");
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
                        >
                          Enviar mensaje
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
