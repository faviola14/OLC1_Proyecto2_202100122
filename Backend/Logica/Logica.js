class Logica {
    constructor(izquierda, operador, derecha) {
        this.izquierda = izquierda;
        this.operador = operador;
        this.derecha = derecha;
    }

    evaluar(registro) {
        switch (this.operador) {
            case "AND":
                return this.izquierda.evaluar(registro) && this.derecha.evaluar(registro);
            case "OR":
                return this.izquierda.evaluar(registro) || this.derecha.evaluar(registro);
        }
        return false;
    }
}

module.exports = Logica;