/* Este archivo `Not.js` define la clase `Not`, que representa una operación lógica de negación. El 
constructor de la clase toma un parámetro `expr`, que representa la expresión a la que se le aplicará 
la negación. El método `evaluar` de la clase evalúa la expresión utilizando el entorno proporcionado, 
obtiene su valor booleano y devuelve un nuevo objeto con el tipo 'boolean' y el valor resultante de 
aplicar la negación a la expresión original. */
class Not {
    constructor(expr) {
        this.expr = expr;
    }

    evaluar(entorno) {
        const val = this.expr.evaluar(entorno);
        return {
            tipo: 'boolean',
            valor: !val.valor
        };
    }
}

module.exports = Not;