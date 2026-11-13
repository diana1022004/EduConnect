// C4 COMPONENTES: parte del "Progreso Controller".
// OBSERVER: observador 1. Emite el certificado cuando se cumplen las condiciones de US-213:
// 100 % de avance y evaluaciones aprobadas. Usa el Builder para armarlo.
class GestorCertificados extends ObservadorProgreso {
  constructor(baseDatos, builder) {
    super();
    this.baseDatos = baseDatos;
    this.builder = builder;
  }

  actualizar({ inscripcion, avance, aprobadas }) {
    if (this.baseDatos.buscarCertificadoDe(inscripcion)) {
      Bitacora.registrar('Observer', 'GestorCertificados: ya tiene certificado, no se emite otra vez');
      return;
    }
    if (avance === 100 && aprobadas) {
      const certificado = this.builder
        .conCodigo(this.baseDatos.nuevoCodigo('CERT'))
        .conInscripcion(inscripcion)
        .conFecha(new Date().toISOString().slice(0, 10))
        .construir();
      Bitacora.registrar('Builder', 'conCodigo() → conInscripcion() → conFecha() → construir()');
      this.baseDatos.guardarCertificado(certificado);
      inscripcion.estado = 'finalizada';
      Bitacora.registrar('Observer', `GestorCertificados: requisitos cumplidos, se emite ${certificado.codCertificado}`);
    } else if (avance === 100) {
      Bitacora.registrar('Observer', 'GestorCertificados: 100 % de avance, pero hay evaluaciones reprobadas. NO se emite');
    }
  }
}
