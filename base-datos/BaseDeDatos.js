// C4 CONTENEDORES: "Base de Datos" (PostgreSQL).
// En el prototipo se simula con colecciones en memoria; cada colección es una tabla del MER.
class BaseDeDatos {
  constructor() {
    this.cursos = new Map();
    this.inscripciones = new Map();
    this.certificados = new Map(); // codInscripcion → certificado (relación 1:1 del MER)
    this.notificaciones = [];
    this.consecutivos = {};
  }

  nuevoCodigo(prefijo) {
    this.consecutivos[prefijo] = (this.consecutivos[prefijo] || 0) + 1;
    return `${prefijo}-${String(this.consecutivos[prefijo]).padStart(4, '0')}`;
  }

  guardarCurso(curso) { this.cursos.set(curso.codCurso, curso); }
  guardarInscripcion(inscripcion) { this.inscripciones.set(inscripcion.codInscripcion, inscripcion); }
  buscarInscripcion(codInscripcion) { return this.inscripciones.get(codInscripcion); }

  buscarCertificadoDe(inscripcion) {
    return this.certificados.get(inscripcion.codInscripcion) || null;
  }

  guardarCertificado(certificado) {
    const clave = certificado.inscripcion.codInscripcion;
    if (this.certificados.has(clave)) {
      throw new Error('La inscripción ya tiene un certificado (relación 1:1 del MER).');
    }
    this.certificados.set(clave, certificado);
  }

  guardarNotificacion(notificacion) { this.notificaciones.push(notificacion); }
}
