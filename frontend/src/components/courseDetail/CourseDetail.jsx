import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import SubjectCard from "../subjectCard/SubjectCard.jsx";
import courses from "../../data/courses.js";

function CourseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

 

  const course = courses.find((c) => c.id === parseInt(id));
  if (!course) return <p>Curso no encontrado</p>;

  return (
    <div className="course-detail">
      <SubjectCard
        img={course.img}
        title={course.title}
        date={course.date}
        description={`Profesor: ${course.professor} | Año: ${course.year === "primer" ? "1° Año" : "2° Año"}`}
        onClick={() => navigate(`/subjects/${course.id}`)}
      />
    </div>
  );
}

export default CourseDetail;
