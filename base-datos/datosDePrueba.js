// Datos de prueba: llena la "base de datos" con un curso, un estudiante y su inscripción.
// Respeta el MER: CURSO → MODULO → ACTIVIDAD, y ESTUDIANTE → INSCRIPCION.
function cargarDatosDePrueba(baseDatos) {
  const curso = new Curso('CUR-01', 'Patrones de Diseño de Software', 30);

  const modulo1 = new Modulo(1, 'Módulo 1: Patrones creacionales');
  modulo1.agregar(new Actividad('ACT-01', 'Lectura: Singleton'));
  modulo1.agregar(new Actividad('ACT-02', 'Quiz: Builder', 'evaluacion', 7.0));

  const modulo2 = new Modulo(2, 'Módulo 2: Patrones estructurales');
  modulo2.agregar(new Actividad('ACT-03', 'Taller: Composite'));
  modulo2.agregar(new Actividad('ACT-04', 'Examen: Estructurales', 'evaluacion', 7.0));

  curso.agregar(modulo1);
  curso.agregar(modulo2);
  curso.coordinadores.push(new Coordinador(2, 'Andrés', 'Gómez', 'coordinacion@usbcali.edu.co'));
  baseDatos.guardarCurso(curso);

  const maria = new Estudiante(1, 'María', 'Rodríguez', 'maria.rodriguez@usbcali.edu.co', 'Ingeniería de Sistemas');
  maria.configurar(new PreferenciaNotificacion('progreso', 'correo', 'inmediata'));

  const inscripcion = new Inscripcion('INS-01', maria, curso);
  baseDatos.guardarInscripcion(inscripcion);
  return inscripcion;
}
