/* Esta clase `Comparacion` representa una operación de comparación entre dos expresiones.
El constructor de la clase toma tres parámetros: `izquierda`, `operador` y `derecha`, que representan 
la expresión a la izquierda del operador, el operador de comparación (como "==", "!=", ">", "<", ">=", "<=") 
y la expresión a la derecha del operador, respectivamente. El método `evaluar` de la clase evalúa ambas 
expresiones utilizando el entorno proporcionado, compara sus valores según el operador especificado y 
devuelve un objeto con el tipo 'boolean' y el resultado de la comparación. Si el operador no es 
reconocido, se lanza un error. */
class Comparacion {
    constructor(izquierda, operador, derecha) {
        this.izquierda = izquierda;
        this.operador = operador;
        this.derecha = derecha;
    }

    evaluar(entorno) {
        const izq = this.izquierda.evaluar(entorno);
        const der = this.derecha.evaluar(entorno);
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