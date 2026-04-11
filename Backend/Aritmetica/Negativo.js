class Negativo {
    constructor(expr) {
        this.expr = expr;
    }

    evaluar(registro) {
        return -Number(this.expr.evaluar(registro));
    }
}

module.exports = Negativo;