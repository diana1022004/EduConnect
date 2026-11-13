// MER: entidad CERTIFICADO (relación 1:1 "obtiene" con INSCRIPCION · US-213).
// Es el producto que arma el patrón Builder.
class Certificado {
  constructor(codCertificado, inscripcion, fechaEmision) {
    this.codCertificado = codCertificado;
    this.inscripcion = inscripcion;
    this.fechaEmision = fechaEmision;
  }
}
