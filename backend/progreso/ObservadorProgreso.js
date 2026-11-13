// PATRÓN OBSERVER (conductual) · Problema D3 y U2 · US-211, US-213
// Interfaz que deben cumplir todos los que quieren enterarse del avance.
class ObservadorProgreso {
  actualizar(datos) {
    throw new Error('actualizar() debe implementarse en el observador');
  }
}
