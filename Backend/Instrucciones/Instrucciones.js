class Declaracion {
    constructor(id, tipo, valor) {
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
    }

    evaluar(registro) {
        if (registro[this.id]) {
            throw new Error(`La variable ${this.id} ya ha sido declarada.`);
        }
        const valorEvaluado = this.valor ? this.valor.evaluar(registro) : null;
        registro[this.id] = { tipo: this.tipo, valor: valorEvaluado };
        return null;
    }
}

class Asignacion {
    constructor(id, valor) {
        this.id = id;
        this.valor = valor;

    }

    evaluar(registro) {
        if (!registro[this.id]) {
            throw new Error(`La variable ${this.id} no ha sido declarada.`);
        }
        const valorEvaluado = this.valor.evaluar(registro);
        registro[this.id].valor = valorEvaluado;
        return null;
    }
}

class Imprimir {
    constructor(expresion, linea, columna) {
        this.expresion = expresion;
    }

    evaluar(registro) {
        const valorEvaluado = this.expresion.evaluar(registro);
        console.log(valorEvaluado);
        return null;
    }   
}

class If { 
    constructor(condicion, instrucciones, linea, columna) {
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }

    evaluar(registro) {
        const condicionEvaluada = this.condicion.evaluar(registro);
        if (condicionEvaluada) {
            const nuevoRegistro = { ...registro };
            for (let i = 0; i < this.instrucciones.length; i++) {
                const instruccion = this.instrucciones[i];
                instruccion.evaluar(nuevoRegistro);
            }
        }
        return null;
    }

}

class For {
    constructor(id, condicion, incremento, instrucciones, linea, columna) {
        this.id = id;
        this.condicion = condicion;
        this.incremento = incremento;
        this.instrucciones = instrucciones;
    }

    evaluar(registro) {
        const nuevoRegistro = { ...registro };
        for (let i = 0; i < this.instrucciones.length; i++) {
            const instruccion = this.instrucciones[i];
            instruccion.evaluar(nuevoRegistro);
        }
        return null;
    }
}

class Switch{
    constructor(expresion, casos, linea, columna){
        this.expresion = expresion;
        this.casos = casos;
    }

    evaluar(registro) {
        const valorEvaluado = this.expresion.evaluar(registro);
        let casoEncontrado = false;
        for (let i = 0; i < this.casos.length; i++) {
            const caso = this.casos[i];
            const valorCaso = caso.valor.evaluar(registro);
            if (valorEvaluado === valorCaso) {
                casoEncontrado = true;
                const nuevoRegistro = { ...registro };
                for (let j = 0; j < caso.instrucciones.length; j++) {
                    const instruccion = caso.instrucciones[j];
                    instruccion.evaluar(nuevoRegistro);
                }
                break;
            }
        }
        if (!casoEncontrado) {
            console.log(`No se encontró un caso coincidente para el valor: ${valorEvaluado}`);
        }
        return null;
    }
}

module.exports = { Declaracion, Asignacion, Imprimir, If, For, Switch };