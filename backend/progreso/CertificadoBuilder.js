// PATRÓN BUILDER (creacional, complementario) · Problema D3 · US-213
// Arma el CERTIFICADO paso a paso y no lo crea si falta un dato obligatorio.
class CertificadoBuilder {
  constructor() { this.reiniciar(); }

  reiniciar() {
    this.codigo = null;
    this.inscripcion = null;
    this.fecha = null;
    return this;
  }

  conCodigo(codigo) { this.codigo = codigo; return this; }
  conInscripcion(inscripcion) { this.inscripcion = inscripcion; return this; }
  conFecha(fecha) { this.fecha = fecha; return this; }

  construir() {
    if (!this.codigo || !this.inscripcion || !this.fecha) {
      throw new Error('No se puede generar el certificado: faltan datos obligatorios (código, inscripción o fecha).');
    }
    const certificado = new Certificado(this.codigo, this.inscripcion, this.fecha);
    this.reiniciar();
    return certificado;
  }
}
