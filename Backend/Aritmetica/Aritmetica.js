class Aritmetica {
    constructor(izquierda, operador, derecha) {
        this.izquierda = izquierda;
        this.operador = operador;
        this.derecha = derecha;
    }

    evaluar(registro) {
        const valIzq = this.obtenerValor(this.izquierda, registro);
        const valDer = this.obtenerValor(this.derecha, registro);

        if (valIzq == null || valDer == null) return null;

        switch (this.operador) {
            case "+": return Number(valIzq) + Number(valDer);
            case "-": return Number(valIzq) - Number(valDer);
            case "*": return Number(valIzq) * Number(valDer);
            case "/": return Number(valIzq) / Number(valDer);
            case "%": return Number(valIzq) % Number(valDer);
        }

        return null;
    }

    obtenerValor(obj, registro) {
        if (obj && typeof obj.evaluar === "function") {
            return obj.evaluar(registro);
        }

        if (typeof obj === "string" && obj in registro) {
            return registro[obj];
        }

        return obj;
    }
}