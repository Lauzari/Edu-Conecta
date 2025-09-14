import { useState } from 'react'
import './App.css'
import MainLayout from './components/mainLayout/MainLayout';
import Home from "./components/home/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
