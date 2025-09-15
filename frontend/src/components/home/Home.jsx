import React from 'react'
import MainBanner from "./mainBanner/MainBanner.jsx";
import Services from './services/Services.jsx';
import CoursesView from "./coursesView/CoursesView.jsx";
import ApplyNow from './applyNow/ApplyNow.jsx';
import OurSubjects from './ourSubjects/OurSubjects.jsx';
import OurFacts from './ourFacts/OurFacts.jsx';
import ContactUs from './contactUs/ContactUs.jsx';

function Home() {
  return (
    <div>
      <MainBanner></MainBanner>
      <Services></Services>
      <CoursesView></CoursesView>
      <ApplyNow></ApplyNow>
      <OurSubjects></OurSubjects>
      <OurFacts></OurFacts>
      <ContactUs></ContactUs>
    </div>
  )
}

export default Home