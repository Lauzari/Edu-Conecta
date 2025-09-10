import { useState } from "react";
import Alert from "../alert/Alert.jsx";

export default function FormProfessor({ setProfessors }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    const subjects = [
        "Programación I", "Matemática I", "Bases de Datos I",
        "Programación II", "Matemática II", "Bases de Datos II"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/Profesores/postular", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ NameProfessor: nombre, Email: email, Subject:subject })
            });
            const data = await res.json();
            setAlertMsg(data.message);

            const updated = await fetch("http://localhost:5000/api/Profesores");
            const profData = await updated.json();
            setProfessors(profData);

            setName(""); setEmail(""); setSubject("");
        } catch (err) {
            console.error(err);
            setAlertMsg("Error al enviar postulación");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Postulación de Profesor</h3>
                <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <select value={subject} onChange={e => setSubject(e.target.value)} required>
                    <option value="" disabled>Seleccione Materia</option>
                    {subjects.map((m, idx) => <option key={idx} value={m}>{m}</option>)}
                </select>
                <button type="submit">Postularse</button>
            </form>
            <Alert message={alertMsg} onClose={() => setAlertMsg("")} />
        </>
    );
}
