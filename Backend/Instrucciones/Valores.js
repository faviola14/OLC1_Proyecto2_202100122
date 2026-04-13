const Nodo = require('./Nodo');

class Numero extends Nodo {
    constructor(valor) {
        super();
        this.valor = valor;
    }

    evaluar() {
        return this.valor;
    }
}

class Cadena extends Nodo {
    constructor(valor) {
        super();
        this.valor = valor;
    }

    evaluar() {
        return this.valor;
    }
}

class Identificador extends Nodo {
    constructor(id) {
        super();
        this.id = id;
    }

    evaluar(entorno) {
        return entorno.obtener(this.id);
    }
}

class Booleano extends Nodo {
    constructor(valor) {
        super();
        this.valor = valor;
    }

    evaluar() {
        return this.valor;
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

module.exports = { Numero, Cadena, Identificador, Booleano, Bloque };