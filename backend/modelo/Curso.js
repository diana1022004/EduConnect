// MER: entidad CURSO · COMPOSITE: COMPUESTO RAÍZ (relación "contiene" módulos).
class Curso extends ComponenteAcademico {
  constructor(codCurso, nombre, cupoMaximo) {
    super(nombre);
    this.codCurso = codCurso;
    this.nombre = nombre;
    this.cupoMaximo = cupoMaximo;
    this.hijos = [];         // módulos (relación "contiene")
    this.coordinadores = []; // relación "administra" con COORDINADOR
  }

  agregar(modulo) {
    this.hijos.push(modulo);
  }

  calcularAvance(inscripcion) {
    if (this.hijos.length === 0) return 0;
    const suma = this.hijos.reduce((total, modulo) => total + modulo.calcularAvance(inscripcion), 0);
    return suma / this.hijos.length;
  }

  evaluacionesAprobadas(inscripcion) {
    return this.hijos.every((modulo) => modulo.evaluacionesAprobadas(inscripcion));
  }
}
