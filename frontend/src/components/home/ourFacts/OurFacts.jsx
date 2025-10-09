import React from 'react'
import "./OurFacts.css";

// Hace falta hacer consulta a la BBDD o dejamos datos ficticios?

function OurFacts() {
  return (
    <section className="our-facts">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-12">
              <h2>Algunos datos de nuestra institución</h2>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12">
                  <div className="count-area-content percentage">
                    <div className="count-digit">100</div>
                    <div className="count-title">clases virtuales</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="count-area-content">
                    <div className="count-digit">26</div>
                    <div className="count-title">profesores verificados</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12">
                  <div className="count-area-content new-students">
                    <div className="count-digit">345</div>
                    <div className="count-title">estudiantes nuevos</div>
                  </div>
                </div> 
                <div className="col-12">
                  <div className="count-area-content">
                    <div className="count-digit">32</div>
                    <div className="count-title">clases disponibles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
        <div className="col-lg-6 align-self-center">
          <div className="video">
            <a href="https://www.youtube.com/watch?v=HndV87XpkWg" target="_blank"><img src="/images/play-icon.png" alt=""/></a>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default OurFacts