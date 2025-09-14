import React from 'react'

function OurFacts() {
  return (
    <section className="our-facts">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-12">
              <h2>A Few Facts About Our University</h2>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12">
                  <div className="count-area-content percentage">
                    <div className="count-digit">94</div>
                    <div className="count-title">Succesed Students</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="count-area-content">
                    <div className="count-digit">126</div>
                    <div className="count-title">Current Teachers</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row">
                <div className="col-12">
                  <div className="count-area-content new-students">
                    <div className="count-digit">2345</div>
                    <div className="count-title">New Students</div>
                  </div>
                </div> 
                <div className="col-12">
                  <div className="count-area-content">
                    <div className="count-digit">32</div>
                    <div className="count-title">Awards</div>
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