// Pestaña "Código": muestra cada archivo del proyecto, agrupado por carpeta.
// Necesita Live Server (con doble clic el navegador no deja leer los archivos).
class VisorCodigo {
  static cargado = false;

  static async mostrar() {
    if (VisorCodigo.cargado) return;
    VisorCodigo.cargado = true;
    const destino = document.querySelector('#code-out');
    for (const archivo of ARCHIVOS) {
      let texto;
      try { texto = await (await fetch(archivo)).text(); }
      catch (e) {
        destino.innerHTML = '<div class="empty">Para ver el código aquí, abre la página con Live Server, o abre los archivos en VS Code.</div>';
        return;
      }
      const seccion = document.createElement('details');
      seccion.className = 'code-sec';
      const resumen = document.createElement('summary');
      const nombre = document.createElement('code');
      nombre.textContent = archivo;
      const primera = document.createElement('span');
      primera.textContent = texto.split('\n')[0].replace(/^\/\/\s*/, '');
      resumen.append(nombre, primera);
      const pre = document.createElement('pre');
      pre.className = 'code';
      pre.innerHTML = VisorCodigo.resaltar(texto.trimEnd());
      seccion.append(resumen, pre);
      destino.append(seccion);
    }
  }

  static resaltar(codigo) {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return esc(codigo).replace(
      /(\/\/[^\n]*)|('(?:[^'\\\n]|\\.)*'|`[^`]*`)|\b(class|extends|constructor|return|const|let|if|else|new|static|this|throw|super|for|of)\b/g,
      (m, c, s, k) => (c ? `<span class="c-com">${c}</span>` : s ? `<span class="c-str">${s}</span>` : `<span class="c-kw">${k}</span>`));
  }
}
