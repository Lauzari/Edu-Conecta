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

  const courses = [
    { img: "/images/course-01.jpg", title: "Morbi tincidunt elit vitae justo rhoncus", stars: 5, price: "$160" },
    { img: "/images/course-02.jpg", title: "Curabitur molestie dignissim purus vel", stars: 3, price: "$180" },
    { img: "/images/course-03.jpg", title: "Nulla at ipsum a mauris egestas tempor", stars: 4, price: "$140" },
    { img: "/images/course-04.jpg", title: "Aenean molestie quis libero gravida", stars: 5, price: "$120" },
    { img: "/images/course-01.jpg", title: "Lorem ipsum dolor sit amet adipiscing elit", stars: 5, price: "$250" },
    { img: "/images/course-02.jpg", title: "TemplateMo is the best website for Free CSS", stars: 5, price: "$270" },
    { img: "/images/course-03.jpg", title: "Web Design Templates at your finger tips", stars: 5, price: "$340" },
    { img: "/images/course-04.jpg", title: "Please visit our website again", stars: 5, price: "$360" },
    { img: "/images/course-01.jpg", title: "Responsive HTML Templates for you", stars: 5, price: "$400" },
    { img: "/images/course-02.jpg", title: "Download Free CSS Layouts for your business", stars: 5, price: "$430" },
    { img: "/images/course-03.jpg", title: "Morbi in libero blandit lectus cursus", stars: 5, price: "$480" },
    { img: "/images/course-04.jpg", title: "Curabitur molestie dignissim purus", stars: 5, price: "$560" },
  ];

  return (
    <section className="our-courses" id="courses">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Our Popular Courses</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <Slider {...settings}>
              {courses.map((course, index) => (
                <div className="item" key={index}>
                  <img src={course.img} alt={course.title} />
                  <div className="down-content">
                    <h4>{course.title}</h4>
                    <div className="info">
                      <div className="row">
                        <div className="col-8">
                          <ul>
                            {Array.from({ length: course.stars }).map((_, i) => (
                              <li key={i}><i className="fa fa-star"></i></li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-4">
                          <span>{course.price}</span>
                        </div>
                      </div>
                    </div>
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
