import React from "react";
import { useState } from "react";

function ApplyNow() {
  const [activeIndex, setActiveIndex] = useState(0);
  

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const items = [
    {
      title: "About Edu Meeting HTML Template",
      content: (
        <p>
          If you want to get the latest collection of HTML CSS templates for
          your websites, you may visit{" "}
          <a rel="nofollow" href="https://www.toocss.com/" target="_blank">
            Too CSS website
          </a>
          . If you need a working contact form script, please visit{" "}
          <a href="https://templatemo.com/contact" target="_parent">
            our contact page
          </a>{" "}
          for more info.
        </p>
      ),
    },
    {
      title: "HTML CSS Bootstrap Layout",
      content: (
        <p>
          Etiam posuere metus orci, vel consectetur elit imperdiet eu. Cras
          ipsum magna, maximus at semper sit amet, eleifend eget neque. Nunc
          facilisis quam purus, sed vulputate augue interdum vitae. Aliquam a
          elit massa.
        </p>
      ),
    },
    {
      title: "Please tell your friends",
      content: (
        <p>
          Ut vehicula mauris est, sed sodales justo rhoncus eu. Morbi porttitor
          quam velit, at ullamcorper justo suscipit sit amet. Quisque at
          suscipit mi, non efficitur velit.
        </p>
      ),
    },
    {
      title: "Share this to your colleagues",
      content: (
        <p>
          Maecenas suscipit enim libero, vel lobortis justo condimentum id.
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
        </p>
      ),
    },
  ];
  return (
    <section className="apply-now" id="apply">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="row">
              <div className="col-lg-12">
                <div className="item">
                  <h3>APPLY FOR BACHELOR DEGREE</h3>
                  <p>
                    You are allowed to use this edu meeting CSS template for
                    your school or university or business. You can feel free to
                    modify or edit this layout.
                  </p>
                  <div className="main-button-red">
                    <div className="scroll-to-section">
                      <a href="#contact">Join Us Now!</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="item">
                  <h3>APPLY FOR BACHELOR DEGREE</h3>
                  <p>
                    You are not allowed to redistribute the template ZIP file on
                    any other template website. Please contact us for more
                    information.
                  </p>
                  <div className="main-button-yellow">
                    <div className="scroll-to-section">
                      <a href="#contact">Join Us Now!</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="accordions is-first-expanded">
              {items.map((item, index) => (
                <article
                  key={index}
                  className={`accordion ${
                    index === items.length - 1 ? "last-accordion" : ""
                  } ${activeIndex === index ? "active" : ""}`}
                >
                  <div
                    className="accordion-head"
                    onClick={() => toggleAccordion(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <span>{item.title}</span>
                    <span className="icon">
                      <i
                        className={`icon fa ${
                          activeIndex === index
                            ? "fa-chevron-down"
                            : "fa-chevron-right"
                        }`}
                      ></i>
                    </span>
                  </div>
                  {activeIndex === index && (
                    <div className="accordion-body">
                      <div className="content">{item.content}</div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplyNow;
