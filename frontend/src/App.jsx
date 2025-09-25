
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from './components/mainLayout/MainLayout';
import Home from "./components/home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubjectDetail from "./components/subjectDetail/SubjectDetail.jsx"; 
import CoursesView from "./components/home/coursesView/CoursesView.jsx";
import ApplyNow from './components/home/applyNow/ApplyNow.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="subjects/:id" element={<SubjectDetail />} />
          <Route path="courses" element={<CoursesView />} />
          <Route path="/applyNow" element={<ApplyNow />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
