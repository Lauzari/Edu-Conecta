
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from './components/mainLayout/MainLayout';
import Home from "./components/home/Home.jsx";
import SubjectDetail from "./components/subjectDetail/SubjectDetail.jsx"; 
import CoursesView from "./components/home/coursesView/CoursesView.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
          <Route path="subjects/:id" element={<SubjectDetail />} />
          <Route path="courses" element={<CoursesView />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
