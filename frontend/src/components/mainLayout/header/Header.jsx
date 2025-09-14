import React from 'react'

function Header() {
  return (
    <header className="header-area header-sticky">
      <div className="container">
          <div className="row">
              <div className="col-12">
                  <nav className="main-nav">
                      <a href="index.html" className="logo">
                          Edu Meeting
                      </a>
                      <ul className="nav">
                          <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
                          <li><a href="meetings.html">Meetings</a></li>
                          <li className="scroll-to-section"><a href="#apply">Apply Now</a></li>
                          <li className="has-sub">
                              <a href="javascript:void(0)">Pages</a>
                              <ul className="sub-menu">
                                  <li><a href="meetings.html">Upcoming Meetings</a></li>
                                  <li><a href="meeting-details.html">Meeting Details</a></li>
                              </ul>
                          </li>
                          <li className="scroll-to-section"><a href="#courses">Courses</a></li> 
                          <li className="scroll-to-section"><a href="#contact">Contact Us</a></li> 
                      </ul>        
                      <a className='menu-trigger'>
                          <span>Menu</span>
                      </a>
                  </nav>
              </div>
          </div>
      </div>
  </header>
  )
}

export default Header