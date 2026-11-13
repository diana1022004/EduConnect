// C4 CONTENEDORES: "API Backend". Se conecta a la Base de Datos y crea sus componentes:
// Progreso Controller y Notificaciones Controller.
class ApiBackend {
  constructor() {
    this.baseDatos = new BaseDeDatos(); // conexión al contenedor Base de Datos
    this.codInscripcion = cargarDatosDePrueba(this.baseDatos).codInscripcion;

    this.seguimiento = new SeguimientoProgreso();
    this.gestorCertificados = new GestorCertificados(this.baseDatos, new CertificadoBuilder());
    this.notificador = new NotificadorProgreso(this.baseDatos, new ServicioCorreo(), new ServicioPush());

    // Observer: el gestor y el notificador se suscriben al seguimiento del progreso.
    this.seguimiento.suscribir(this.gestorCertificados);
    this.seguimiento.suscribir(this.notificador);

    this.progreso = new ProgresoController(this.baseDatos, this.seguimiento);
  }
}
