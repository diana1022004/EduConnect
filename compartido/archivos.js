// Lista de archivos en el orden en que se cargan (una clase padre antes que sus hijas).
// La usan la pestaña "Código" y la versión de consola.
const ARCHIVOS = [
  'compartido/Bitacora.js',
  // API Backend · modelo (entidades del MER)
  'backend/modelo/Usuario.js',
  'backend/modelo/Estudiante.js',
  'backend/modelo/Coordinador.js',
  'backend/modelo/PreferenciaNotificacion.js',
  'backend/modelo/ComponenteAcademico.js',
  'backend/modelo/Actividad.js',
  'backend/modelo/Modulo.js',
  'backend/modelo/Curso.js',
  'backend/modelo/Inscripcion.js',
  'backend/modelo/Certificado.js',
  'backend/modelo/Notificacion.js',
  // Contenedor Base de Datos (simulada)
  'base-datos/BaseDeDatos.js',
  'base-datos/datosDePrueba.js',
  // API Backend · componente Progreso Controller
  'backend/progreso/ObservadorProgreso.js',
  'backend/progreso/SeguimientoProgreso.js',
  'backend/progreso/CertificadoBuilder.js',
  'backend/progreso/GestorCertificados.js',
  'backend/progreso/ProgresoController.js',
  // API Backend · componente Notificaciones Controller
  'backend/notificaciones/NotificadorProgreso.js',
  // Sistemas externos
  'externos/ServicioCorreo.js',
  'externos/ServicioPush.js',
  // Contenedor API Backend (conecta sus componentes)
  'backend/ApiBackend.js',
  // Contenedor Aplicación Web
  'frontend/VistaProgreso.js',
  'frontend/VisorCodigo.js',
  'frontend/main.js',
];
if (typeof module !== 'undefined') module.exports = ARCHIVOS;
