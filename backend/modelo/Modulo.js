// MER: entidad débil MODULO (se identifica por su orden dentro del curso).
// COMPOSITE: COMPUESTO que agrupa actividades (relación "incluye").
class Modulo extends ComponenteAcademico {
  constructor(orden, titulo) {
    super(titulo);
    this.orden = orden;
    this.hijos = [];
  }

  agregar(actividad) {
    this.hijos.push(actividad);
  }

  // No pregunta si el hijo es actividad o evaluación: les pide lo mismo a todos.
  calcularAvance(inscripcion) {
    if (this.hijos.length === 0) return 0;
    const suma = this.hijos.reduce((total, hijo) => total + hijo.calcularAvance(inscripcion), 0);
    return suma / this.hijos.length;
  }

  evaluacionesAprobadas(inscripcion) {
    return this.hijos.every((hijo) => hijo.evaluacionesAprobadas(inscripcion));
  }
}
