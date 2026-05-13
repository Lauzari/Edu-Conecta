# Test Cases – Edu-Conecta

## TC-001 – Registro de usuario exitoso

- **Módulo:** Registro
- **Prioridad:** Alta
- **Tipo de prueba:** Funcional

### Precondiciones
- Usuario no registrado previamente.

### Datos de prueba
- Nombre: Laura Moyano
- Email: laura@test.com
- Contraseña: Test1234

### Pasos
1. Ingresar a la pantalla de registro.
2. Completar los campos obligatorios.
3. Presionar el botón “Registrarse”.

### Resultado esperado
El usuario se registra correctamente y el sistema confirma la creación de la cuenta.

---

## TC-002 – Registro con email ya existente

- **Módulo:** Registro
- **Prioridad:** Alta
- **Tipo de prueba:** Negativa

### Precondiciones
- Usuario previamente registrado.

### Pasos
1. Ingresar a la pantalla de registro.
2. Completar el formulario con un email existente.
3. Presionar “Registrarse”.

### Resultado esperado
El sistema debe mostrar un mensaje indicando que el email ya se encuentra registrado.

---

## TC-003 – Login exitoso

- **Módulo:** Login
- **Prioridad:** Alta
- **Tipo de prueba:** Funcional

### Precondiciones
- Usuario registrado.

### Pasos
1. Ingresar a la pantalla de login.
2. Completar email y contraseña válidos.
3. Presionar “Iniciar sesión”.

### Resultado esperado
El usuario accede correctamente a la plataforma.

---

## TC-004 – Login con contraseña inválida

- **Módulo:** Login
- **Prioridad:** Alta
- **Tipo de prueba:** Negativa

### Precondiciones
- Usuario registrado.

### Pasos
1. Ingresar email válido.
2. Ingresar contraseña incorrecta.
3. Presionar “Iniciar sesión”.

### Resultado esperado
El sistema debe impedir el acceso y mostrar mensaje de credenciales inválidas.

---

## TC-005 – Búsqueda de cursos disponibles

- **Módulo:** Cursos
- **Prioridad:** Media
- **Tipo de prueba:** Funcional

### Precondiciones
- Existencia de cursos publicados.

### Pasos
1. Ingresar al módulo de cursos.
2. Escribir una palabra clave en el buscador.
3. Ejecutar la búsqueda.

### Resultado esperado
El sistema debe mostrar cursos relacionados con la búsqueda realizada.

---

## TC-006 – Filtrar cursos por “1er año”

- **Módulo:** Cursos
- **Prioridad:** Media
- **Tipo de prueba:** Funcional

### Precondiciones
- Existencia de cursos clasificados como “1er año”.

### Pasos
1. Ingresar al listado de cursos.
2. Seleccionar el filtro “1er año”.

### Resultado esperado
El sistema muestra únicamente cursos correspondientes a “1er año”.

---

## TC-007 – Filtrar cursos por “2do año”

- **Módulo:** Cursos
- **Prioridad:** Media
- **Tipo de prueba:** Funcional

### Precondiciones
- Existencia de cursos clasificados como “2do año”.

### Pasos
1. Ingresar al listado de cursos.
2. Seleccionar el filtro “2do año”.

### Resultado esperado
El sistema muestra únicamente cursos correspondientes a “2do año”.

---

## TC-008 – Envío exitoso de solicitud para profesor

- **Módulo:** Solicitud para profesor
- **Prioridad:** Alta
- **Tipo de prueba:** Funcional

### Precondiciones
- Usuario autenticado.

### Pasos
1. Ingresar al formulario de solicitud para profesor.
2. Completar todos los campos obligatorios.
3. Presionar “Enviar solicitud”.

### Resultado esperado
El sistema envía la solicitud correctamente y muestra confirmación.

---

## TC-009 – Validación de campos obligatorios en solicitud para profesor

- **Módulo:** Solicitud para profesor
- **Prioridad:** Alta
- **Tipo de prueba:** Negativa

### Precondiciones
- Usuario autenticado.

### Pasos
1. Ingresar al formulario.
2. Dejar campos obligatorios vacíos.
3. Presionar “Enviar solicitud”.

### Resultado esperado
El sistema debe mostrar validaciones y evitar el envío de la solicitud.