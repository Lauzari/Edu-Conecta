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
        breakpoint: 992, // tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // móviles
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const items = [
    {
      icon: "/images/service-icon-01.png",
      title: "Best Education",
      desc: "Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.",
    },
    {
      icon: "/images/service-icon-02.png",
      title: "Best Teachers",
      desc: "Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.",
    },
    {
      icon: "/images/service-icon-03.png",
      title: "Best Students",
      desc: "Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.",
    },
    {
      icon: "/images/service-icon-02.png",
      title: "Online Meeting",
      desc: "Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.",
    },
    {
      icon: "/images/service-icon-03.png",
      title: "Best Networking",
      desc: "Suspendisse tempor mauris a sem elementum bibendum. Praesent facilisis massa non vestibulum.",
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
