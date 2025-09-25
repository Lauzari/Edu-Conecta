import './App.css'
import MainLayout from './components/mainLayout/MainLayout';
import Home from "./components/home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
