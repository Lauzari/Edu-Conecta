# Bug Reports – Edu-Conecta

## Bug Report #BR-001

**Título:** El filtro de cursos por año no actualiza correctamente los resultados al cambiar entre “1er año” y “2do año”.

- **ID:** BR-001
- **Módulo:** Búsqueda y filtros de cursos
- **Severidad:** Media
- **Prioridad:** Alta
- **Estado:** Open
- **Entorno:** Producción / Navegador Chrome
- **Reportado por:** QA
- **Fecha:** 13/05/2026

### Precondiciones
- Usuario autenticado en el sistema.
- Existencia de cursos cargados para 1er y 2do año.

### Pasos para reproducir
1. Ingresar al listado de cursos.
2. Seleccionar el filtro “1er año”.
3. Verificar resultados mostrados.
4. Cambiar inmediatamente al filtro “2do año”.

### Resultado esperado
El sistema debe actualizar el listado y mostrar únicamente cursos correspondientes a “2do año”.

### Resultado actual
El listado mantiene cursos mezclados entre “1er año” y “2do año” hasta refrescar manualmente la página.

### Evidencia
- Captura pendiente.
- Logs pendientes.

---

## Bug Report #BR-002

**Título:** El sistema permite enviar una solicitud para profesor con campos incompletos.

- **ID:** BR-002
- **Módulo:** Solicitud para profesor
- **Severidad:** Alta
- **Prioridad:** Alta
- **Estado:** Open
- **Entorno:** Producción / Navegador Chrome
- **Reportado por:** QA
- **Fecha:** 13/05/2026

### Precondiciones
- Usuario autenticado.
- Acceso al formulario de solicitud para profesor.

### Pasos para reproducir
1. Ingresar al formulario de solicitud.
2. Completar solo un campo obligatorio.
3. Presionar “Enviar solicitud”.

### Resultado esperado
El sistema debe validar los campos obligatorios y evitar el envío.

### Resultado actual
La solicitud se envía correctamente aun con información incompleta.

### Evidencia
- Captura pendiente.
- Logs pendientes.