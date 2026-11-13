# EduConnect · Prototipo (Trabajo Final)

Funcionalidad: **seguimiento del progreso y emisión automática del certificado**
(US-211, US-213), con los patrones **Composite**, **Observer** y **Builder**.

El prototipo implementa una sola funcionalidad, pero su código sigue la estructura
de los diagramas del proyecto: **una clase por archivo** y una carpeta por contenedor
o componente del modelo C4. Las clases del modelo son las entidades del MER.

## Estructura

```
educonnect-prototipo/
├── index.html                      → la página (pestañas Demo, Diagramas → código, Código, Impacto)
├── css/estilos.css
├── frontend/                       → CONTENEDOR Aplicación Web
│   ├── VistaProgreso.js            → dibuja la respuesta del API
│   ├── VisorCodigo.js              → pestaña "Código"
│   └── main.js                     → arranque y escenarios
├── backend/                        → CONTENEDOR API Backend
│   ├── ApiBackend.js               → se conecta a la BD y crea los componentes
│   ├── modelo/                     → ENTIDADES DEL MER
│   │   ├── Usuario.js, Estudiante.js, Coordinador.js   (ES-UN)
│   │   ├── ComponenteAcademico.js  (Composite: componente)
│   │   ├── Curso.js, Modulo.js     (Composite: compuestos)
│   │   ├── Actividad.js            (Composite: hoja)
│   │   ├── Inscripcion.js          (incluye la relación "avanza en")
│   │   ├── Certificado.js, PreferenciaNotificacion.js, Notificacion.js
│   ├── progreso/                   → COMPONENTE Progreso Controller
│   │   ├── ProgresoController.js   (entrada del API)
│   │   ├── ObservadorProgreso.js   (Observer: interfaz)
│   │   ├── SeguimientoProgreso.js  (Observer: sujeto)
│   │   ├── GestorCertificados.js   (Observer: observador 1)
│   │   └── CertificadoBuilder.js   (Builder)
│   └── notificaciones/
│       └── NotificadorProgreso.js  → COMPONENTE Notificaciones Controller (Observer: observador 2)
├── base-datos/                     → CONTENEDOR Base de Datos (simulada en memoria)
│   ├── BaseDeDatos.js
│   └── datosDePrueba.js
├── externos/                       → SISTEMAS EXTERNOS (correo y push, simulados)
├── compartido/                     → bitácora de la demo y lista de archivos
└── consola/ejecutar.js             → corre el mismo backend sin la página
```

## Cómo ejecutarlo en VS Code

**Página:** abre la carpeta en VS Code, instala la extensión **Live Server** y haz
clic derecho sobre `index.html` › **Open with Live Server**. (Con doble clic también
funciona, pero la pestaña "Código" solo muestra los archivos con Live Server).

**Consola:** en la terminal de VS Code ejecuta `node consola/ejecutar.js`
(necesitas Node.js: https://nodejs.org).
