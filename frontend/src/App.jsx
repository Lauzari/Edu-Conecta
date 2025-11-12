import "./App.css";
import { Routes, Route } from "react-router-dom";
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
import Dashboard from "./components/dashboard/Dashboard.jsx";
import UserProfile from "./components/user/UserProfile.jsx";
import Protected from "./components/protected/Protected";
import PrivateRoute from "./components/privateRoute/PrivateRoute.jsx";
import NotFound from "./components/errors/notFound/NotFound.jsx";
import MyCourses from "./components/myCourses/MyCourses.jsx";

function App() {
  return (
    <>
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
          <Route path="/form-professor" element={<RegisterProfessor />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<Protected />}>
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        </Route>
        <Route path="/register" element={<Register isEdit={false} />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
