// MER: ESTUDIANTE ES-UN USUARIO (especialización). Hereda los datos de la cuenta
// y agrega su programa académico y sus preferencias (relación "configura").
class Estudiante extends Usuario {
  constructor(idUsuario, nombres, apellidos, correoInstitucional, programaAcademico) {
    super(idUsuario, nombres, apellidos, correoInstitucional);
    this.programaAcademico = programaAcademico;
    this.preferencias = []; // PREFERENCIA_NOTIFICACION (entidad débil del estudiante)
  }

  configurar(preferencia) {
    this.preferencias.push(preferencia);
  }

  preferenciaDe(tipo) {
    return this.preferencias.find((p) => p.tipo === tipo && p.activa);
  }
}
