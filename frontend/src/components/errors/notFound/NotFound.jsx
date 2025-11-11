import React from "react";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-bg">
      <div className="notfound-container">
      <img
        src="/images/errors/404.png"
        alt="404 Error"
        className="notfound-image"
      />
      <div className="notfound-text">
        <h1>¡Ups! No encontramos lo que estás buscando</h1>
        <p>
          Parece que esta página se fue a tomar un café ☕<br/>
          Pero no te preocupes, podés volver al menú de clases y seguir estudiando.
          <br />
          <a href="/courses" className="btn-home">
          Volver al inicio
        </a>
        </p>
        
      </div>
      </div>
    </div>
  );
}

export default NotFound;
