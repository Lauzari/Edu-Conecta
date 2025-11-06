import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import SubjectCard from "../../subjectCard/SubjectCard.jsx";
import "./OurSubjects.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../../../hooks/useAuth.js";

function OurSubjects() {
  const navigate = useNavigate();
  const { token } = useAuth(); // obtenemos el token

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://localhost:7018/api/Subject", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener materias");
        }

        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error al cargar cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

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

  if (loading) return <p>Cargando materias...</p>;

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
                    // Usamos name en lugar de title
                    title={course.name}
                    description={course.description}
                    // img puede ser un placeholder si no existe
                    img={`/images/subjects/${course.id}.jpg`}
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
