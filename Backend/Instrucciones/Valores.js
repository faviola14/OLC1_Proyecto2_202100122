const Nodo = require('./Nodo');
const Entorno = require("../Instrucciones/Entorno");

class rune extends Nodo{
    constructor(valor) {
        super();
        this.valor = valor;
    }
    evaluar(entorno) {
        return { tipo: 'rune', valor: this.valor};
    }
}


class int extends Nodo {
    constructor(valor) {
        super();
        this.valor = valor;
    }
    evaluar() {
        return { tipo: 'int', valor: this.valor};
    }
}

class float64 extends Nodo {
    constructor(valor) {
        super();
        this.valor = valor;
    }
    evaluar() {
        return { tipo: 'float64', valor: this.valor};
    }
}

class string extends Nodo {
    constructor(valor) {
        super();
        this.valor =  valor;
    }
    evaluar() {
        return { tipo: 'string', valor: this.valor};
    }
}

class Identificador extends Nodo {
    constructor(id) {
        super();
        this.id = id;
    }
    evaluar(entorno) {
        const variable = entorno.obtener(this.id);
        return { tipo: variable.tipo, valor: variable.valor};
    }
}

class bool extends Nodo {
    constructor(valor) {
        super();
        this.valor = valor;
    }
    evaluar() {
        return { tipo: 'boolean', valor: this.valor};
    }
}

class Bloque extends Nodo {
    constructor(instrucciones) {
        super();
        this.instrucciones = instrucciones;
    }
    evaluar(entorno) {
        const nuevoEntorno = new Entorno(entorno);
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(nuevoEntorno);
        }
        return null;
    }
}

module.exports = { int, string, Identificador, bool, Bloque,rune, float64 };