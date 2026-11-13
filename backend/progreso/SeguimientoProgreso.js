// C4 COMPONENTES: parte del "Progreso Controller".
// OBSERVER: SUJETO. Calcula el avance con el Composite y avisa a sus observadores,
// sin saber quiénes son ni qué hace cada uno.
class SeguimientoProgreso {
  constructor() {
    this.observadores = [];
  }

  suscribir(observador) { this.observadores.push(observador); }
  desuscribir(observador) { this.observadores = this.observadores.filter((o) => o !== observador); }

  notificar(datos) {
    Bitacora.registrar('Observer', `notificar() a ${this.observadores.length} observador(es)`);
    this.observadores.forEach((observador) => observador.actualizar(datos));
  }

  registrarAvance(inscripcion, actividad, nota = null) {
    inscripcion.registrarAvance(actividad, nota);

    const avance = inscripcion.curso.calcularAvance(inscripcion);            // Composite
    const aprobadas = inscripcion.curso.evaluacionesAprobadas(inscripcion);  // Composite
    inscripcion.porcentajeAvance = avance;
    Bitacora.registrar('Composite', `curso.calcularAvance() → ${avance.toFixed(1)} % · evaluacionesAprobadas() → ${aprobadas}`);

    this.notificar({ inscripcion, avance, aprobadas });
  }
}
