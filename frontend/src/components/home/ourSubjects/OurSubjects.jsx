import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function OurSubjects() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
//Cambiar por consulta a la BBDD
  const courses = [
    {
      img: "/images/course-01.jpg",
      title: "Programación II",
    },
    {
      img: "/images/course-02.jpg",
      title: "Organización Empresarial",
    },
    {
      img: "/images/course-03.jpg",
      title: "Arquitectura y Sistemas Operativos",
    },
    { img: "/images/course-04.jpg", title: "Inglés II",},
    {
      img: "/images/course-01.jpg",
      title: "Programación IV",
    },
    {
      img: "/images/course-02.jpg",
      title: "Base de Datos I",
    },
    { img: "/images/course-03.jpg", title: "Inglés I",},
    {
      img: "/images/course-04.jpg",
      title: "Estadística y Probabilidad",
    },
    {
      img: "/images/course-01.jpg",
      title: "Metodología de Sistemas II",
    },
    {
      img: "/images/course-02.jpg",
      title: "Introducción al Análisis de Datos",
    },
    {
      img: "/images/course-03.jpg",
      title: "Programación I",
    },
    {
      img: "/images/course-04.jpg",
      title: "Matemáticas",
    },
  ];

  return (
    <section className="our-courses" id="courses">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Materias disponibles</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...settings}>
              {courses.map((course, index) => (
                <div className="item" key={index}>
                  <img src={course.img} alt={course.title} />
                  <div className="down-content">
                    <h4>{course.title}</h4>
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

export default OurSubjects;
