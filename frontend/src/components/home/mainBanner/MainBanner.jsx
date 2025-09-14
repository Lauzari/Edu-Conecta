import React from "react";

function MainBanner() {
  return (
    <section className="section main-banner" id="top" data-section="section1">
      <video autoPlay muted loop id="bg-video">
        <source src="/images/course-video.mp4" type="video/mp4" />
      </video>

      <div className="video-overlay header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="caption">
                <h6>Hello Students</h6>
                <h2>Welcome to Education</h2>
                <p>
                  This is an edu meeting HTML CSS template provided by{" "}
                  <a
                    rel="nofollow"
                    href="https://templatemo.com/page/1"
                    target="_blank"
                  >
                    TemplateMo website
                  </a>
                  . This is a Bootstrap v5.1.3 layout. The video background is
                  taken from Pexels website, a group of young people by{" "}
                  <a
                    rel="nofollow"
                    href="https://www.pexels.com/@pressmaster"
                    target="_blank"
                  >
                    Pressmaster
                  </a>
                  .
                </p>
                <div className="main-button-red">
                  <div className="scroll-to-section">
                    <a href="#contact">Join Us Now!</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainBanner;
