// C4 COMPONENTES: "Progreso Controller", puerta de entrada del API para esta funcionalidad.
// La Aplicación Web solo llama a estos métodos y recibe datos simples (como un JSON):
// nunca toca directamente las clases del modelo.
class ProgresoController {
  constructor(baseDatos, seguimiento) {
    this.baseDatos = baseDatos;
    this.seguimiento = seguimiento;
  }

  // Equivale a: POST /inscripciones/{cod}/actividades/{cod}
  registrarActividad(codInscripcion, codActividad, nota = null) {
    const inscripcion = this.baseDatos.buscarInscripcion(codInscripcion);
    const actividad = this.buscarActividad(inscripcion.curso, codActividad);
    if (actividad.tipo === 'evaluacion' && (nota === null || nota < 0 || nota > 10)) {
      throw new Error('La nota debe estar entre 0 y 10.');
    }
    this.seguimiento.registrarAvance(inscripcion, actividad, nota);
    this.baseDatos.guardarInscripcion(inscripcion);
    return this.consultarProgreso(codInscripcion);
  }

  // Equivale a: GET /inscripciones/{cod}/progreso
  consultarProgreso(codInscripcion) {
    const inscripcion = this.baseDatos.buscarInscripcion(codInscripcion);
    const curso = inscripcion.curso;
    const certificado = this.baseDatos.buscarCertificadoDe(inscripcion);
    return {
      estudiante: inscripcion.estudiante.nombreCompleto(),
      curso: curso.nombre,
      avance: curso.calcularAvance(inscripcion),
      aprobadas: curso.evaluacionesAprobadas(inscripcion),
      estado: inscripcion.estado,
      modulos: curso.hijos.map((modulo) => ({
        titulo: modulo.titulo,
        avance: modulo.calcularAvance(inscripcion),
        actividades: modulo.hijos.map((a) => ({
          codigo: a.codActividad, titulo: a.titulo, tipo: a.tipo, notaMinima: a.notaMinima,
          ...inscripcion.avanceEn(a),
          aprobada: a.evaluacionesAprobadas(inscripcion),
        })),
      })),
      certificado: certificado && {
        codigo: certificado.codCertificado,
        estudiante: inscripcion.estudiante.nombreCompleto(),
        curso: curso.nombre,
        fecha: certificado.fechaEmision,
      },
    };
  }

  buscarActividad(curso, codActividad) {
    for (const modulo of curso.hijos) {
      const actividad = modulo.hijos.find((a) => a.codActividad === codActividad);
      if (actividad) return actividad;
    }
    throw new Error(`No existe la actividad ${codActividad}`);
  }
}
