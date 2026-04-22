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