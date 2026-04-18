class Comparacion {
    constructor(izquierda, operador, derecha) {
        this.izquierda = izquierda;
        this.operador = operador;
        this.derecha = derecha;
    }

    evaluar(entorno) {
        const valIzq = this.izquierda.evaluar(entorno);
        const valDer = this.derecha.evaluar(entorno);
        if (valIzq == null || valDer == null) return false;
        switch (this.operador) {
            case "==": return valIzq === valDer;
            case "!=": return valIzq !== valDer;
            case ">": return valIzq > valDer;
            case "<": return valIzq < valDer;
            case ">=": return valIzq >= valDer;
            case "<=": return valIzq <= valDer;
        }
        return false;
    }
}

module.exports = Comparacion;