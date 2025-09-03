export default function AdminDashboard({ usuarios, profesores }) {
    return (
        <div className="admin-dashboard">
            <h3>Panel de Administrador</h3>

            <h4>Usuarios Registrados:</h4>
            <ul>
                {usuarios.map((u, idx) => (
                    <li key={idx}>{u.Nombre} - {u.Email}</li>
                ))}
            </ul>

            <h4>Postulaciones de Profesores:</h4>
            <ul>
                {profesores.map((p, idx) => (
                    <li key={idx}>{p.NombreProfesor} - {p.Email} - {p.Materia}</li>
                ))}
            </ul>
        </div>
    );
}
