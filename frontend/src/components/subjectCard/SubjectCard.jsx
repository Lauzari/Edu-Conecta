import React from "react";
import "./SubjectCard.css";

function SubjectCard({ img, title, date, description, onClick }) {
  const [month, day] = date ? date.split(" ") : ["", ""];

  return (
    <div className="subject-card meeting-item" onClick={onClick}>
      <div
        className="thumb"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "200px",
          position: "relative",
        }}
      >
        <div className="date">
          <h6>
            {month} <span>{day}</span>
          </h6>
        </div>
      </div>
      <div className="down-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SubjectCard;
