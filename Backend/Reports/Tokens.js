/* Tokens.js: Módulo para representar los tokens generados por el analizador léxico. */
class Tokens{
    constructor(lexema,tipo,fila,columna){
        this.lexema = lexema;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
}

module.exports = Tokens;