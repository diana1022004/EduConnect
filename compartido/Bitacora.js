// Bitácora de la demo: solo sirve para mostrar en pantalla (o en consola) qué
// patrón actúa en cada paso. NO hace parte del diseño de EduConnect.
class Bitacora {
  static escritor = null; // la Aplicación Web lo reemplaza para pintar la bitácora

  static registrar(etiqueta, texto, separador = false) {
    if (Bitacora.escritor) Bitacora.escritor(etiqueta, texto, separador);
    else console.log(`${separador ? '\n' : ''}[${etiqueta}] ${texto}`);
  }
}
