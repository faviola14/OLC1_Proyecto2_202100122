class Errores{
  constructor(tipo, descripcion, fila, columna) {
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.fila = fila;
    this.columna = columna;
  }
}

module.exports = Errores;