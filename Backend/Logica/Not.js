class Not {
    constructor(expr) {
        this.expr = expr;
    }

    evaluar(registro) {
        return !this.expr.evaluar(registro);
    }
}