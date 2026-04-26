/* Este archivo `Logica.js` define la clase `Logica`, que representa una operación lógica entre dos 
expresiones. El constructor de la clase toma tres parámetros: `izquierda`, `operador` y `derecha`, 
que representan la expresión a la izquierda del operador, el operador lógico (como "AND" o "OR") y 
la expresión a la derecha del operador, respectivamente. El método `evaluar` de la clase evalúa ambas 
expresiones utilizando el entorno proporcionado, obtiene sus valores booleanos y luego aplica el operador
lógico para obtener el resultado final. El resultado se devuelve como un objeto con el tipo 'boolean' y 
el valor resultante de la operación lógica. Si el operador no es reconocido, se lanza un error. */
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