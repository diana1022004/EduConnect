// MER: entidad ACTIVIDAD · COMPOSITE: HOJA del árbol.
// El atributo tipo distingue una actividad de una evaluación (con nota mínima).
class Actividad extends ComponenteAcademico {
  constructor(codActividad, titulo, tipo = 'actividad', notaMinima = null) {
    super(titulo);
    this.codActividad = codActividad;
    this.tipo = tipo;             // "actividad" o "evaluacion"
    this.notaMinima = notaMinima; // solo para las evaluaciones
  }

  calcularAvance(inscripcion) {
    return inscripcion.avanceEn(this).completada ? 100 : 0;
  }

  evaluacionesAprobadas(inscripcion) {
    if (this.tipo !== 'evaluacion') return true; // una actividad no tiene nota
    const avance = inscripcion.avanceEn(this);
    return avance.completada && avance.nota >= this.notaMinima;
  }
}
