import { useState } from "react";
import Alert from "../alert/Alert.jsx";

export default function FormUser({ setUsers }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMsg, setAlertMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/Usuarios/registrar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            setAlertMsg(data.message);

            const updated = await fetch("http://localhost:5000/api/Usuarios");
            const usersData = await updated.json();
            setUsuarios(usersData);

            setName(""); setEmail(""); setPassword("");
        } catch (err) {
            console.error(err);
            setAlertMsg("Error al registrar usuario");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Registro de Usuario</h3>
                <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Registrar</button>
            </form>
            <Alert message={alertMsg} onClose={() => setAlertMsg("")} />
        </>
    );
}
