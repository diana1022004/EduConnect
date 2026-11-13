// MER: entidad débil PREFERENCIA_NOTIFICACION (US-321).
// Se identifica por el tipo de aviso dentro de cada estudiante.
class PreferenciaNotificacion {
  constructor(tipo, canal, frecuencia, activa = true) {
    this.tipo = tipo;             // por ejemplo: "progreso"
    this.canal = canal;           // "correo" o "push"
    this.frecuencia = frecuencia; // por ejemplo: "inmediata"
    this.activa = activa;
  }
}
