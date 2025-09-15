import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Services() {
  const settings = {
    dots: true,          // puntos de navegación
    infinite: true,      // loop infinito
    speed: 500,
    slidesToShow: 3,     // cuántos ítems se ven a la vez
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1080, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 840, // móviles
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const items = [
    {
      icon: "/images/service-icon-01.png",
      title: "Excelente nivel educativo",
      desc: "Nuestro programa combina teoría y práctica para que aprendas de verdad. Queremos que cada clase te acerque un paso más a tus metas académicas..",
    },
    {
      icon: "/images/service-icon-02.png",
      title: "Nuestro cuerpo docente",
      desc: "Contamos con docentes certificados y apasionados por enseñar. Ellos entienden el plan de la UTN y saben cómo ayudarte a superar cada desafío.",
    },
    {
      icon: "/images/service-icon-03.png",
      title: "Buenos estudiantes",
      desc: "Formamos una comunidad de alumnos comprometidos y solidarios. Podés compartir dudas, experiencias y crecer junto a tus compañeros.",
    },
    {
      icon: "/images/service-icon-02.png",
      title: "Clases virtuales",
      desc: "Aprendé desde donde estés con clases online dinámicas y accesibles. Ganás flexibilidad sin perder la calidad y el acompañamiento de siempre.",
    },

  ];

  return (
    <section className="services">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Slider {...settings}>
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
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
