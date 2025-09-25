import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CoursesView.css";

function CoursesView() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const courses = [
    {
      id: 1,
      year: "primer",
      title: "Programación II",
      date: "Nov 10",
      img: "/images/meeting-01.jpg",
      professor:"Pérez, Pedro",
    },
    {
      id: 2,
      year: "primer",
      title: "Base de Datos I",
      date: "Nov 24",
      img: "/images/meeting-02.jpg",
      professor:"Méndez, Lucía",
    },
    {
      id: 3,
      year: "segundo",
      title: "Metod. de Sistemas I",
      date: "Nov 26",
      img: "/images/meeting-03.jpg",
      professor:"Poli, Jorgelina",
    },
    {
      id: 4,
      year: "segundo",
      title: "Legislación",
      date: "Nov 30",
      img: "/images/meeting-04.jpg",
      professor:"Ardusso, Celeste",
    },
    {
      id: 5,
      year: "segundo",
      title: "Programación III",
      date: "Nov 30",
      img: "/images/meeting-02.jpg",
      professor:"López, Juan Carlos",
    },
    {
      id: 6,
      year: "segundo",
      title: "Base de Datos II",
      date: "Nov 30",
      img: "/images/meeting-01.jpg",
      professor:"Paglia, Pablo",
    },
    {
      id: 7,
      year: "primer",
      title: "Org. Empresarial",
      date: "Nov 10",
      img: "/images/meeting-03.jpg",
      professor:"Muñoz, Paulina",
    },
    {
      id: 8,
      year: "primer",
      title: "Estadística y Prob.",
      date: "Nov 10",
      img: "/images/meeting-04.jpg",
      professor:"Lindt, Ignacio",
    },
  ];

  const filteredCourses =
  filter === "all"
    ? courses.slice(0, 4)
    : courses.filter((c) => c.year === filter);

  return (
    <section className="courses-view">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Algunos de nuestros cursos</h2>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="categories">
              <h4>¿En qué año de la carrera estás?</h4>
              <ul>
                <li>
                  <button
                    className={filter === "primer" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setFilter("primer");
                    }}
                  >
                    Primer año
                  </button>
                </li>
                <br />
                <li>
                  <button
                    className={filter === "segundo" ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      setFilter("segundo");
                    }}
                  >
                    Segundo año
                  </button>
                </li>
              </ul>

              <div className="main-button-blue">
                <button onClick={() => navigate("/courses")}>Todos los cursos</button>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="row">
              {filteredCourses.map((course) => (
                <div key={course.id} className="col-lg-6">
                  <div className="meeting-item">
                    <div className="thumb">
                      <div className="year">
                        <span>{course.year === "primer" ? "1° Año" : "2° Año"}</span>
                      </div>
                      <button onClick={() => navigate(`/courses/${course.id}`)}>
                        <img src={course.img} alt={course.title} />
                      </button>
                    </div>
                    <div className="down-content">
                      <div className="date">
                        <h6>
                          {course.date.split(" ")[0]}{" "}
                          <span>{course.date.split(" ")[1]}</span>
                        </h6>
                      </div>
                      <a href="meeting-details.html">
                        <h4>{course.title}</h4>
                      </a>
                      <p><b>Profesor:</b>
                      <br />
                        {course.professor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoursesView;
