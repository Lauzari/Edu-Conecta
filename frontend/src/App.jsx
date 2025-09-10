import { useState } from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Subjects from "./components/subjects/Subjects.jsx";
import FormUser from "./components/formUser/FormUser.jsx";
import FormProfessor from "./components/formProfessor/FormProfessor.jsx";
import AdminDashboard from "./components/adminDashboard/AdminDashboard.jsx";

import "./components/adminDashboard/AdminDashboard.css";
import "./components/navbar/Navbar.css";
import "./components/subjects/Subjects.css";
import "./components/alert/Alert.css";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [professors, setProfessors] = useState([]);

  return (
    <div className="app-container">
      <Navbar />
      <div className="dashboard-grid">
        <Subjects />
        <FormUser setUsers={setUsers} />
        <FormProfessor setProfessors={setProfessors} />
      </div>
      <AdminDashboard users={users} professors={professors} />
    </div>
  );
}

export default App;
