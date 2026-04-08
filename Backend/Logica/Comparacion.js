class Comparacion {
    constructor(izquierda, operador, derecha) {
        this.izquierda = izquierda;
        this.operador = operador;
        this.derecha = derecha;
    }

    evaluar(registro) {
        const valIzq = this.obtenerValor(this.izquierda, registro);
        const valDer = this.obtenerValor(this.derecha, registro);

        if (valIzq == null || valDer == null) return false;

        switch (this.operador) {
            case "==": return valIzq === valDer;
            case "!=": return valIzq !== valDer;
            case ">": return Number(valIzq) > Number(valDer);
            case "<": return Number(valIzq) < Number(valDer);
            case ">=": return Number(valIzq) >= Number(valDer);
            case "<=": return Number(valIzq) <= Number(valDer);
        }

        return false;
    }

    obtenerValor(obj, registro) {
        if (typeof obj === "string" && obj in registro) {
            return registro[obj];
        }
        return obj;
    }
}