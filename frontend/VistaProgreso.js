// C4 CONTENEDORES: "Aplicación Web". Solo dibuja lo que responde el API
// (datos simples) y le envía al API lo que hace el estudiante.
class VistaProgreso {
  constructor(alRegistrar) {
    this.alRegistrar = alRegistrar; // función que llama al API Backend
  }

  pintar(respuesta) {
    this.pintarPanel(respuesta);
    this.pintarArbol(respuesta);
    this.pintarCertificado(respuesta);
  }

  pintarPanel(r) {
    document.querySelector('#nombre').textContent = r.estudiante;
    document.querySelector('#estado').textContent = 'Inscripción ' + r.estado;
    document.querySelector('#big').textContent = this.porcentaje(r.avance);
    const barra = document.querySelector('#bar');
    barra.firstElementChild.style.width = r.avance + '%';
    barra.setAttribute('aria-valuenow', String(Math.round(r.avance)));
    const evaluaciones = r.modulos.flatMap((m) => m.actividades).filter((a) => a.tipo === 'evaluacion');
    const reprobada = evaluaciones.some((a) => a.completada && !a.aprobada);
    document.querySelector('#r1').className = 'dot' + (r.avance === 100 ? ' on' : '');
    document.querySelector('#r2').className = 'dot' + (r.aprobadas ? ' on' : reprobada ? ' off' : '');
    document.querySelector('#live').textContent = `Avance del curso: ${Math.round(r.avance)} por ciento.`;
  }

  pintarArbol(r) {
    const arbol = document.querySelector('#tree');
    arbol.innerHTML = '';
    const raiz = this.nodo('Curso: ' + r.curso, r.avance, 'node course');
    for (const modulo of r.modulos) {
      const nodoModulo = this.nodo(modulo.titulo, modulo.avance, 'node');
      for (const actividad of modulo.actividades) nodoModulo.lastChild.append(this.hoja(actividad));
      raiz.lastChild.append(nodoModulo);
    }
    arbol.append(raiz);
  }

  pintarCertificado(r) {
    const caja = document.querySelector('#cert');
    if (r.certificado) {
      caja.innerHTML = '<div class="cert"><div class="t">Certificado digital · EduConnect</div><div class="meta">Otorgado a</div><div class="who"></div><div class="meta">por completar el curso <b class="cn"></b></div><div class="meta">Código <span class="cc"></span> · emitido el <span class="fe"></span></div></div>';
      caja.querySelector('.who').textContent = r.certificado.estudiante;
      caja.querySelector('.cn').textContent = r.certificado.curso;
      caja.querySelector('.cc').textContent = r.certificado.codigo;
      caja.querySelector('.fe').textContent = r.certificado.fecha;
    } else if (r.avance === 100 && !r.aprobadas) {
      caja.innerHTML = '<div class="alert">Avance al 100 %, pero hay evaluaciones reprobadas. No se emite el certificado (US-213).</div>';
    } else {
      caja.innerHTML = '<div class="empty">El certificado aparece aquí cuando se cumplen los dos requisitos.</div>';
    }
  }

  mostrarError(mensaje) {
    const caja = document.querySelector('#cert');
    caja.innerHTML = '<div class="alert"></div>';
    caja.firstChild.textContent = mensaje;
  }

  // ---- piezas del árbol ----
  nodo(titulo, avance, clase) {
    const div = document.createElement('div');
    div.className = clase;
    div.innerHTML = '<div class="node-h"><span class="nm"></span><span class="pct"></span></div><div class="kids"></div>';
    div.querySelector('.nm').textContent = titulo;
    div.querySelector('.pct').textContent = this.porcentaje(avance);
    return div;
  }

  hoja(a) {
    const div = document.createElement('div');
    div.className = 'leaf';
    div.innerHTML = '<div class="nm"><span class="kind"></span></div>';
    div.querySelector('.kind').textContent = a.tipo === 'evaluacion' ? `Evaluación · hoja · mínimo ${a.notaMinima.toFixed(1)}` : 'Actividad · hoja';
    div.firstChild.append(document.createTextNode(a.titulo));

    if (a.tipo === 'actividad') {
      const etiqueta = document.createElement('label');
      etiqueta.className = 'chk';
      const casilla = document.createElement('input');
      casilla.type = 'checkbox';
      casilla.checked = a.completada;
      casilla.disabled = a.completada;
      casilla.addEventListener('change', () => this.alRegistrar(a.codigo, null));
      etiqueta.append(casilla, document.createTextNode(a.completada ? 'Completada' : 'Completar'));
      div.append(etiqueta);
    } else {
      const caja = document.createElement('div');
      caja.className = 'nota';
      const campo = document.createElement('input');
      campo.type = 'number'; campo.min = '0'; campo.max = '10'; campo.step = '0.1';
      campo.placeholder = '0–10';
      campo.value = a.completada ? a.nota : '';
      campo.setAttribute('aria-label', 'Nota de ' + a.titulo);
      const boton = document.createElement('button');
      boton.className = 'btn small ghost';
      boton.textContent = 'Registrar';
      boton.addEventListener('click', () => this.alRegistrar(a.codigo, parseFloat(campo.value)));
      caja.append(campo, boton);
      const estado = document.createElement('span');
      estado.className = 'st ' + (!a.completada ? 'pend' : a.aprobada ? 'ok' : 'bad');
      estado.textContent = !a.completada ? 'Pendiente' : a.aprobada ? 'Aprobada' : 'Reprobada';
      div.append(caja, estado);
    }
    return div;
  }

  porcentaje(valor) {
    const r = Math.round(valor * 10) / 10;
    return (Number.isInteger(r) ? r : r.toFixed(1)) + '%';
  }
}
