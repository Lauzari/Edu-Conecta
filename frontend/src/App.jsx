import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/mainLayout/MainLayout";
import Home from "./components/home/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubjectDetail from "./components/subjectDetail/SubjectDetail.jsx";
import CourseDetail from "./components/courseDetail/CourseDetail.jsx";
import CoursesView from "./components/home/coursesView/CoursesView.jsx";
import ApplyNow from "./components/home/applyNow/ApplyNow.jsx";
import ContactUs from "./components/home/contactUs/ContactUs.jsx";
import RegisterProfessor from "./components/form/professorFrom/ProfessorFrom.jsx";
import AllCoursesView from "./components/home/allCoursesView/AllCoursesView.jsx";
import Register from "./components/register/RegisterTemplate.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="subjects/:id" element={<SubjectDetail />} />
             <Route path="/courses/:id" element={<CourseDetail />} />
             
            <Route path="/courses" element={<AllCoursesView />} />
            <Route path="/all-courses" element={<AllCoursesView />} />
            <Route path="/applyNow" element={<ApplyNow />} />
            <Route path="/contact" element={<ContactUs />} />
            
            <Route path="/from-professor" element={<RegisterProfessor />} />
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
