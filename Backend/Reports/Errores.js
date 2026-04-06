class Errores{
    constructor(tipo, descripcion, fila, columna) {
    this.descripcion = descripcion;
    this.fila = fila;
    this.columna = columna;
    this.tipo = tipo;
  }
}

module.exports = Errores;