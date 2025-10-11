import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/mainLayout/MainLayout";
import Home from "./components/home/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubjectDetail from "./components/subjectDetail/SubjectDetail.jsx";
import CourseDetail from "./components/courseDetail/CourseDetail.jsx";
import ApplyNow from "./components/home/applyNow/ApplyNow.jsx";
import ContactUs from "./components/home/contactUs/ContactUs.jsx";
import RegisterProfessor from "./components/form/professorFrom/ProfessorFrom.jsx";
import AllCoursesView from "./components/home/allCoursesView/AllCoursesView.jsx";
import Register from "./components/register/RegisterTemplate.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import UserProfile from "./components/user/UserProfile.jsx";

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
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/form-professor" element={<RegisterProfessor />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
