# Edu-Conecta

**Proyecto Final - Tecnicatura Universitaria en Programación**
**Universidad Tecnológica Nacional (UTN) - Facultad Regional Rosario**

Este repositorio contiene el código fuente y la documentación de **Edu-Conecta**, desarrollado como proyecto final para la Tecnicatura en Programación.

---

## 📋 Descripción del Proyecto

Edu-Conecta es una plataforma web integral diseñada para facilitar y gestionar procesos educativos. [Completar con una breve descripción de la funcionalidad específica del sistema, ej: gestionar la conexión entre estudiantes y tutores, administración de cursos, seguimiento académico, etc.].

El sistema fue desarrollado siguiendo prácticas modernas de ingeniería de software, utilizando una arquitectura escalable y tecnologías de punta tanto en el frontend como en el backend.

---

## 🛠️ Tecnologías y Herramientas

El desarrollo se llevó a cabo utilizando el siguiente stack tecnológico:

### 🖥️ Frontend (Cliente)
Aplicación de página única (SPA) construida con **React** y herramientas modernas.
*   **Lenguaje**: JavaScript / JSX
*   **Framework**: [React](https://react.dev/) (v19)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Estilos y UI**:
    *   [Bootstrap 5](https://getbootstrap.com/)
    *   [React-Bootstrap](https://react-bootstrap.github.io/)
    *   React Icons
*   **Enrutamiento**: React Router v7
*   **Otras Librerías**:
    *   `jwt-decode`: Para decodificación de tokens de autenticación.
    *   `react-toastify`: Para notificaciones visuales.
    *   `react-slick`, `slick-carousel`: Para componentes de carrusel interactivos.

### ⚙️ Backend (Servidor)
API RESTful construida sobre el ecosistema **.NET**, implementando **Clean Architecture** para garantizar la separación de responsabilidades, testabilidad y mantenibilidad.
*   **Lenguaje**: C#
*   **Framework**: .NET 8
*   **Arquitectura**: Clean Architecture (Capas: *Web, Core, Infrastructure*)
*   **Base de Datos**: SQL Server
*   **ORM**: Entity Framework Core (Code First)
*   **Autenticación**: JWT (JSON Web Tokens)
*   **Documentación de API**: Swagger / OpenAPI

### 📂 Estructura de la Solución Backend
*   **Core**: Contiene las entidades del dominio e interfaces (reglas de negocio puras, independientes de la tecnología).
*   **Infrastructure**: Implementación de acceso a datos (EF Core), repositorios, migraciones y servicios externos.
*   **Web**: Controladores de la API, configuración de inyección de dependencias y endpoints expuestos.

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos
*   [Node.js](https://nodejs.org/) (v18 o superior)
*   [.NET SDK](https://dotnet.microsoft.com/download) (v8.0)
*   [SQL Server](https://www.microsoft.com/sql-server/) (Instancia local o remota en ejecución)

### 1. Configuración de la Base de Datos
1.  Asegúrate de tener SQL Server corriendo.
2.  Configura la cadena de conexión en el archivo `backend/src/Web/appsettings.json` o `appsettings.Development.json` para que apunte a tu instancia local.
3.  Aplica las migraciones para crear la base de datos:
    ```bash
    cd backend/src/Web
    dotnet ef database update --project ../Infrastructure
    ```

### 2. Ejecutar el Backend
```bash
cd backend/src/Web
dotnet run
```
El servidor debería iniciar en `https://localhost:7193` o `http://localhost:5037` (verify ports in launchSettings.json). Puedes ver la documentación de la API en `/swagger/index.html`.

### 3. Ejecutar el Frontend
```bash
cd frontend
npm install
npm run dev
```
La aplicación cliente estará disponible generalmente en `http://localhost:5173`.

---

## 👥 Equipo de Desarrollo

*   [Rey Justina]
*   [Lucero Agustina]
*   [Moyano Maria Laura]