/* La clase `Negativo` en JavaScript representa una operación de negación que se puede evaluar 
en un entorno dado. La clase tiene un constructor que recibe una expresión a evaluar, y el método 
`evaluar` se encarga de evaluar la expresión utilizando el método `evaluar` de la expresión y luego 
devuelve el valor negativo del resultado. */
class Negativo {
    constructor(expr) {
        this.expr = expr;
    }

    evaluar(registro) {
        return -Number(this.expr.evaluar(registro));
    }
}

module.exports = Negativo;