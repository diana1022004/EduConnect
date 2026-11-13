// PATRÓN COMPOSITE (estructural) · Problema D2 · US-211, US-213
// Componente común del árbol CURSO → MODULO → ACTIVIDAD del MER.
// Hojas y compuestos responden a las mismas dos preguntas, para una inscripción:
//   ¿cuánto avance lleva?  y  ¿aprobó las evaluaciones?
class ComponenteAcademico {
  constructor(titulo) {
    this.titulo = titulo;
  }

  calcularAvance(inscripcion) {
    throw new Error('calcularAvance() debe implementarse en la subclase');
  }

  evaluacionesAprobadas(inscripcion) {
    throw new Error('evaluacionesAprobadas() debe implementarse en la subclase');
  }
}
