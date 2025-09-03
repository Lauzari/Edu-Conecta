import { useState } from "react";
import Alert from "../alert/Alert.jsx";

export default function FormProfesor({ setProfesores }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [materia, setMateria] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    const materias = [
        "Programación I", "Matemática I", "Bases de Datos I",
        "Programación II", "Matemática II", "Bases de Datos II"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/Profesores/postular", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ NombreProfesor: nombre, Email: email, Materia: materia })
            });
            const data = await res.json();
            setAlertMsg(data.message);

            const updated = await fetch("http://localhost:5000/api/Profesores");
            const profData = await updated.json();
            setProfesores(profData);

            setNombre(""); setEmail(""); setMateria("");
        } catch (err) {
            console.error(err);
            setAlertMsg("Error al enviar postulación");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Postulación de Profesor</h3>
                <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <select value={materia} onChange={e => setMateria(e.target.value)} required>
                    <option value="" disabled>Seleccione Materia</option>
                    {materias.map((m, idx) => <option key={idx} value={m}>{m}</option>)}
                </select>
                <button type="submit">Postularse</button>
            </form>
            <Alert message={alertMsg} onClose={() => setAlertMsg("")} />
        </>
    );
}
