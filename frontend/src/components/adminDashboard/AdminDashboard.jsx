export default function AdminDashboard({ users, professors }) {
    return (
        <div className="admin-dashboard">
            <h3>Panel de Administrador</h3>

            <h4>Usuarios Registrados:</h4>
            <ul>
                {users.map((u, idx) => (
                    <li key={idx}>{u.Nombre} - {u.Email}</li>
                ))}
            </ul>

            <h4>Postulaciones de Profesores:</h4>
            <ul>
                {professors.map((p, idx) => (
                    <li key={idx}>{p.NameProfessor} - {p.Email} - {p.Subject}</li>
                ))}
            </ul>
        </div>
    );
}
