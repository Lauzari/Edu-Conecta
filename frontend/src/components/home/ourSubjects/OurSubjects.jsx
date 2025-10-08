import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import SubjectCard from "../../subjectCard/SubjectCard.jsx";
import courses from "../../../data/courses.js";

import "./OurSubjects.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./OurSubjects.css";

function OurSubjects() {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };


  return (
    <section className="our-subjects" id="courses">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Materias disponibles</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...settings}>
              {courses.map((course) => (
                <div className="item" key={course.id}>
                  <SubjectCard
                    img={course.img}
                    title={course.title}
                    description={course.description}
                    onClick={() => navigate(`/subjects/${course.id}`)}
                  />
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
