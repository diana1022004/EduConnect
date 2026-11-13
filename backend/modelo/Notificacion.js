// MER: entidad NOTIFICACION (relación "recibe" con ESTUDIANTE).
class Notificacion {
  constructor(codNotificacion, estudiante, tipo, canal, mensaje) {
    this.codNotificacion = codNotificacion;
    this.estudiante = estudiante;
    this.tipo = tipo;
    this.canal = canal;
    this.mensaje = mensaje;
    this.fechaEnvio = new Date().toISOString().slice(0, 10);
  }
}
