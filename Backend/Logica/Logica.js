class Logica {
    constructor(izquierda, operador, derecha) {
        this.izquierda = izquierda;
        this.operador = operador;
        this.derecha = derecha;
    }

    evaluar(entorno) {
        const izq = this.izquierda.evaluar(entorno);
        const der = this.derecha.evaluar(entorno);
        const valIzq = izq.valor;
        const valDer = der.valor;
        let resultado;
        switch (this.operador) {
            case "AND":
                resultado = valIzq && valDer;
                break;
            case "OR":
                resultado = valIzq || valDer;
                break;
            default:
                throw new Error("Operador lógico desconocido");
        }
        return {
            tipo: 'boolean',
            valor: resultado
        };
    }
}

module.exports = Logica;