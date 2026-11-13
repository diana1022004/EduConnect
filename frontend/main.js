// Arranque de la demo: crea el API Backend y la Aplicación Web y los conecta.
// Los escenarios solo llaman al API, igual que lo haría el estudiante.

// 1. La bitácora se pinta en la página
Bitacora.escritor = (etiqueta, texto, separador) => {
  const fila = document.createElement('div');
  fila.className = 'ev' + (separador ? ' sep' : '');
  const tag = document.createElement('span');
  tag.className = 'tag ' + etiqueta;
  tag.textContent = etiqueta;
  const msg = document.createElement('span');
  msg.textContent = texto;
  fila.append(tag, msg);
  document.querySelector('#log').prepend(fila);
};

// 2. API Backend (contenedor) y Aplicación Web (contenedor)
let api = new ApiBackend();
const vista = new VistaProgreso(registrar);
let pasos = [];

function registrar(codActividad, nota) {
  try {
    const titulo = api.progreso.buscarActividad(api.baseDatos.buscarInscripcion(api.codInscripcion).curso, codActividad).titulo;
    Bitacora.registrar('Sistema', nota === null ? `María completa "${titulo}"` : `María saca ${nota.toFixed(1)} en "${titulo}"`, true);
    const respuesta = api.progreso.registrarActividad(api.codInscripcion, codActividad, nota);
    vista.pintar(respuesta);
  } catch (error) {
    vista.mostrarError(error.message);
  }
}

function reiniciar(mensaje = 'Curso reiniciado') {
  pasos.forEach(clearTimeout);
  pasos = [];
  api = new ApiBackend();
  document.querySelector('#toggle').setAttribute('aria-pressed', 'true');
  document.querySelector('#toggle').textContent = 'Desuscribir notificaciones';
  document.querySelector('#disc').hidden = true;
  Bitacora.registrar('Sistema', mensaje, true);
  vista.pintar(api.progreso.consultarProgreso(api.codInscripcion));
}

function ejecutar(lista) {
  const rapido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  lista.forEach(([actividad, nota], i) => pasos.push(setTimeout(() => registrar(actividad, nota), rapido ? 0 : (i + 1) * 650)));
}

// 3. Botones de la demo
document.querySelector('#sc1').addEventListener('click', () => {
  reiniciar('ESCENARIO 1: María completa todo y aprueba');
  ejecutar([['ACT-01', null], ['ACT-02', 8.5], ['ACT-03', null], ['ACT-04', 9.0], ['ACT-03', null]]);
});
document.querySelector('#sc2').addEventListener('click', () => {
  reiniciar('ESCENARIO 2: María llega al 100 % pero reprueba el examen');
  ejecutar([['ACT-01', null], ['ACT-02', 8.5], ['ACT-03', null], ['ACT-04', 5.0]]);
});
document.querySelector('#sc3').addEventListener('click', () => {
  Bitacora.registrar('Sistema', 'ESCENARIO 3: construir un certificado sin inscripción', true);
  try {
    new CertificadoBuilder().conCodigo('CERT-PRUEBA').conFecha('2026-11-12').construir();
  } catch (error) {
    Bitacora.registrar('Builder', error.message);
    vista.mostrarError('Escenario 3 · ' + error.message);
  }
});
document.querySelector('#reset').addEventListener('click', () => reiniciar());
document.querySelector('#toggle').addEventListener('click', (e) => {
  const boton = e.currentTarget;
  const suscrito = boton.getAttribute('aria-pressed') === 'true';
  if (suscrito) api.seguimiento.desuscribir(api.notificador);
  else api.seguimiento.suscribir(api.notificador);
  Bitacora.registrar('Observer', suscrito
    ? 'desuscribir(NotificadorProgreso): ya no se envían correos; el certificado sigue funcionando'
    : 'suscribir(NotificadorProgreso): se vuelven a enviar los avisos', true);
  boton.setAttribute('aria-pressed', String(!suscrito));
  boton.textContent = suscrito ? 'Suscribir notificaciones' : 'Desuscribir notificaciones';
  document.querySelector('#disc').hidden = !suscrito;
});

// 4. Pestañas
const pestanas = [...document.querySelectorAll('[role=tab]')];
pestanas.forEach((tab, i) => {
  tab.addEventListener('click', () => seleccionar(tab));
  tab.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') seleccionar(pestanas[(i + 1) % pestanas.length]);
    if (e.key === 'ArrowLeft') seleccionar(pestanas[(i - 1 + pestanas.length) % pestanas.length]);
  });
});
function seleccionar(tab) {
  pestanas.forEach((t) => {
    const activa = t === tab;
    t.setAttribute('aria-selected', activa);
    t.tabIndex = activa ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !activa;
  });
  if (tab.id === 't-code') VisorCodigo.mostrar();
  tab.focus();
}

// 5. Estado inicial: María ya hizo la lectura del módulo 1
Bitacora.registrar('Sistema', 'Inicio: se cargan los datos de prueba (curso, módulos, actividades e inscripción)', true);
vista.pintar(api.progreso.consultarProgreso(api.codInscripcion));
registrar('ACT-01', null);
