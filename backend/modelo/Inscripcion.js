// MER: entidad INSCRIPCION (une al ESTUDIANTE con el CURSO).
// Guarda también la relación "avanza en" con ACTIVIDAD y sus atributos
// (completada, nota, fecha): el curso es el mismo para todos, lo que cambia
// es el avance de cada inscripción.
class Inscripcion {
  constructor(codInscripcion, estudiante, curso) {
    this.codInscripcion = codInscripcion;
    this.estudiante = estudiante;
    this.curso = curso;
    this.fechaInscripcion = new Date().toISOString().slice(0, 10);
    this.estado = 'activa';      // activa, retirada o finalizada
    this.porcentajeAvance = 0;
    this.avances = new Map();    // relación "avanza en": codActividad → { completada, nota, fecha }
  }

  avanceEn(actividad) {
    return this.avances.get(actividad.codActividad) || { completada: false, nota: null, fecha: null };
  }

  registrarAvance(actividad, nota = null) {
    const fecha = new Date().toISOString().slice(0, 10);
    this.avances.set(actividad.codActividad, { completada: true, nota, fecha });
  }
}
