import React from "react";
import "./SubjectCard.css";

function SubjectCard({ img, title, description, onClick }) {

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
      </div>
      <div className="down-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default SubjectCard;
