// Versión de consola: ejecuta el MISMO backend, sin la Aplicación Web.
// Sirve para mostrar que el API Backend no depende de la interfaz.
// Uso (desde la carpeta del proyecto):  node consola/ejecutar.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ARCHIVOS = require('../compartido/archivos.js');

const raiz = path.join(__dirname, '..');
ARCHIVOS.filter((a) => !a.startsWith('frontend/')).forEach((archivo) => {
  vm.runInThisContext(fs.readFileSync(path.join(raiz, archivo), 'utf8'), { filename: archivo });
});

vm.runInThisContext(`
  function mostrar(r) {
    console.log('   → Avance: ' + r.avance.toFixed(1) + ' % · aprobadas: ' + r.aprobadas +
      (r.certificado ? ' · CERTIFICADO ' + r.certificado.codigo : ''));
  }

  console.log('===== ESCENARIO 1: María completa todo y aprueba =====');
  let api = new ApiBackend();
  for (const [actividad, nota] of [['ACT-01', null], ['ACT-02', 8.5], ['ACT-03', null], ['ACT-04', 9.0], ['ACT-03', null]]) {
    Bitacora.registrar('Sistema', 'Registra ' + actividad + (nota !== null ? ' con nota ' + nota : ''), true);
    mostrar(api.progreso.registrarActividad(api.codInscripcion, actividad, nota));
  }

  console.log('\\n===== ESCENARIO 2: llega al 100 % pero reprueba =====');
  api = new ApiBackend();
  for (const [actividad, nota] of [['ACT-01', null], ['ACT-02', 8.5], ['ACT-03', null], ['ACT-04', 5.0]]) {
    Bitacora.registrar('Sistema', 'Registra ' + actividad + (nota !== null ? ' con nota ' + nota : ''), true);
    mostrar(api.progreso.registrarActividad(api.codInscripcion, actividad, nota));
  }

  console.log('\\n===== ESCENARIO 3: Builder sin inscripción =====');
  try { new CertificadoBuilder().conCodigo('CERT-PRUEBA').conFecha('2026-11-12').construir(); }
  catch (e) { console.log('[Builder] ' + e.message); }
`);
