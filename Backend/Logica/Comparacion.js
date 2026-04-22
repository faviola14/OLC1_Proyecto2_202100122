class Comparacion {
    constructor(izquierda, operador, derecha) {
        this.izquierda = izquierda;
        this.operador = operador;
        this.derecha = derecha;
    }

    evaluar(entorno) {
        const izq = this.izquierda.evaluar(entorno);
        const der = this.derecha.evaluar(entorno);
        //console.log("IZQ: ", izq);
        //console.log("DER: ", der);
        if (!izq || !der) {
            return { tipo: 'boolean', valor: false };
        }
        const valIzq = izq.valor;
        const valDer = der.valor;
        let resultado;
        switch (this.operador) {
            case "==": resultado = valIzq == valDer; break;
            case "!=": resultado = valIzq != valDer; break;
            case ">": resultado = valIzq > valDer; break;
            case "<": resultado = valIzq < valDer; break;
            case ">=": resultado = valIzq >= valDer; break;
            case "<=": resultado = valIzq <= valDer; break;
            default:
                throw new Error("Operador desconocido");
        }
        return {
            tipo: 'boolean',
            valor: resultado
        };
    }
}

module.exports = Comparacion;