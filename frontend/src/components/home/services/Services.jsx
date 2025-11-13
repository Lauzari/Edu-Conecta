import React, { useMemo } from "react";
import "./Services.css";

function Services() {
  const items = [
    {
      icon: "/images/school.png",
      title: "Excelente nivel educativo",
      desc: "Nuestro programa combina teoría y práctica para que aprendas de verdad. Queremos que cada clase te acerque un paso más a tus metas académicas.",
    },
    {
      icon: "/images/student.png",
      title: "Nuestro cuerpo docente",
      desc: "Contamos con docentes certificados y apasionados por enseñar. Ellos entienden el plan de la UTN y saben cómo ayudarte a superar cada desafío.",
    },
    {
      icon: "/images/teachings.png",
      title: "Clases virtuales",
      desc: "Aprendé desde donde estés con clases online dinámicas y accesibles. Ganás flexibilidad sin perder la calidad y el acompañamiento de siempre.",
    },
  ];

  return (
    <section className="services">
      <div className="container">
        <div className="cards-grid">
          {items.map((item, index) => (
            <div className="item" key={index}>
              <div className="icon">
                <img src={item.icon} alt={item.title} />
              </div>
              <div className="down-content">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
