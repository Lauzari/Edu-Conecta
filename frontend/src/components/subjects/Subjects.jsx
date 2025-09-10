export default function Subjects () {
    const subjects = [
        "Programación I", "Matemática I", "Bases de Datos I",
        "Programación II", "Matemática II", "Bases de Datos II"
    ];

    return (
        <div className="subjects-container">
            {subjects.map((m, idx) => (
                <div key={idx} className="subject-card">{m}</div>
            ))}
        </div>
    );
}
