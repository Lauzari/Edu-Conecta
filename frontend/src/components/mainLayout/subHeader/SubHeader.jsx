import React from 'react'

function SubHeader() {
  return (
    <div className="sub-header">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-sm-8">
          <div className="left-content">
            <p>This is an educational <em>HTML CSS</em> template by TemplateMo website.</p>
          </div>
        </div>
        <div className="col-lg-4 col-sm-4">
          <div className="right-icons">
            <ul>
              <li><a href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a href="#"><i className="fa fa-behance"></i></a></li>
              <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SubHeader