export default function Materias() {
    const materias = [
        "Programación I", "Matemática I", "Bases de Datos I",
        "Programación II", "Matemática II", "Bases de Datos II"
    ];

    return (
        <div className="materias-container">
            {materias.map((m, idx) => (
                <div key={idx} className="materia-card">{m}</div>
            ))}
        </div>
    );
}
