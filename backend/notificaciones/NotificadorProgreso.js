// C4 COMPONENTES: "Notificaciones Controller" (envía avisos por correo y push).
// OBSERVER: observador 2. Avisa al estudiante su avance por el canal que eligió
// en sus preferencias (US-321) y, cuando hay certificado, avisa al coordinador.
class NotificadorProgreso extends ObservadorProgreso {
  constructor(baseDatos, servicioCorreo, servicioPush) {
    super();
    this.baseDatos = baseDatos;
    this.servicioCorreo = servicioCorreo;
    this.servicioPush = servicioPush;
    this.certificadosAvisados = new Set(); // para no avisar dos veces el mismo certificado
  }

  actualizar({ inscripcion, avance }) {
    const certificado = this.baseDatos.buscarCertificadoDe(inscripcion);
    if (certificado && !this.certificadosAvisados.has(certificado.codCertificado)) {
      this.certificadosAvisados.add(certificado.codCertificado);
      this.avisarEstudiante(inscripcion, `¡Felicitaciones! Ya puedes descargar tu certificado de ${inscripcion.curso.nombre}.`);
      for (const coordinador of inscripcion.curso.coordinadores) {
        this.servicioCorreo.enviar(coordinador,
          `Nuevo certificado ${certificado.codCertificado} de ${inscripcion.estudiante.nombreCompleto()} para validar.`);
      }
    } else if (!certificado) {
      this.avisarEstudiante(inscripcion, `Tu avance en ${inscripcion.curso.nombre} es ${Math.round(avance)} %.`);
    }
  }

  avisarEstudiante(inscripcion, mensaje) {
    const estudiante = inscripcion.estudiante;
    const preferencia = estudiante.preferenciaDe('progreso');
    if (!preferencia) return; // el estudiante desactivó este aviso

    const servicio = preferencia.canal === 'push' ? this.servicioPush : this.servicioCorreo;
    servicio.enviar(estudiante, mensaje);
    this.baseDatos.guardarNotificacion(new Notificacion(
      this.baseDatos.nuevoCodigo('NOT'), estudiante, 'progreso', preferencia.canal, mensaje));
  }
}
