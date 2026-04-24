const Consola = require("../Reports/Consola");
const Errores = require('../Reports/Errores');
class Entorno {
    constructor(padre = null) {
        this.tabla = new Map();
        this.padre = padre;
        this.errores = [];
    }

    declarar(id, valor) {
        if (this.tabla.has(id)) {
            this.errores.push(`Variable ya definida: ${id}`);
            Errores.agregar("Semántico", "Variable ya definida: " + id);
        } else {
            this.tabla.set(id, valor);
        }
    }

    obtener(id) {
        if (typeof id === "object") {
            if (id.tipo === "Identificador") {
                id = id.valor;
            } else if (id.id) {
                id = id.id;
            }
        }
        const variable = this.tabla.get(id);
        if (variable !== undefined) {
            return variable;
        }
        if (this.padre) {
            return this.padre.obtener(id);
        }
        //console.log("GET FALLÓ:", id);
        Errores.agregar("Semántico", "Variable no definida: " + id);
    }
    
    asignar(id, valor) {
        let actual = this;
        while (actual != null) {
            if (actual.tabla.has(id)) {
                actual.tabla.set(id, valor);
                //console.log("SET:", id, valor);
                return;
            }
            actual = actual.padre;
        }
        this.errores.push(`Variable no definida: ${id}`);
        Errores.agregar("Semántico", "Variable no definida: " + id);
    }

    existe(id) {
    let actual = this;
    while (actual != null) {
        if (actual.tabla.has(id)) return true;
        actual = actual.padre;
    }
    return false;
    }
    

    existeLocal(id) {
        return this.tabla.has(id);
    }
}
module.exports = Entorno;