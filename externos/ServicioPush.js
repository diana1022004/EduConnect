// C4: sistema externo "Servicio de Notificaciones Push" (simulado).
class ServicioPush {
  enviar(estudiante, mensaje) {
    Bitacora.registrar('Externo', `Push a ${estudiante.nombreCompleto()}: "${mensaje}"`);
  }
}
