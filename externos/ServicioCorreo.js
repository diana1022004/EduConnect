// C4: sistema externo "Servicio de Correo" (simulado).
class ServicioCorreo {
  enviar(estudiante, mensaje) {
    Bitacora.registrar('Externo', `Correo a ${estudiante.correoInstitucional}: "${mensaje}"`);
  }
}
