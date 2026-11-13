// MER: entidad USUARIO (solo los atributos que usa esta funcionalidad).
class Usuario {
  constructor(idUsuario, nombres, apellidos, correoInstitucional) {
    this.idUsuario = idUsuario;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.correoInstitucional = correoInstitucional;
  }

  nombreCompleto() {
    return `${this.nombres} ${this.apellidos}`;
  }
}
