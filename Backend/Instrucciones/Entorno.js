const Consola = require("../Reports/Consola");
const Errores = require('../Reports/Errores');
/* La clase Entorno representa un entorno de ejecución para un programa, donde se almacenan variables 
y sus valores. Cada entorno puede tener un entorno padre, lo que permite la creación de entornos anidados
para funciones o bloques de código. */
class Entorno {
    constructor(padre = null) {
        this.tabla = new Map();
        this.padre = padre;
        this.errores = [];
    }
    /* Declarar una variable en el entorno */
    declarar(id, valor) {
        if (this.tabla.has(id)) {
            this.errores.push(`Variable ya definida: ${id}`);
            Errores.agregar("Semántico", "Variable ya definida: " + id);
        } else {
            this.tabla.set(id, valor);
        }
    }
    /* Obtener el valor de una variable en el entorno, buscando en los entornos padres si no se encuentra
    en el entorno actual. */
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
    /* Asignar un nuevo valor a una variable existente en el entorno, buscando en los entornos padres 
    si no se encuentra en el entorno actual. */
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
    /* Verificar si una variable existe en el entorno actual o en los entornos padres. */
    existe(id) {
    let actual = this;
    while (actual != null) {
        if (actual.tabla.has(id)) return true;
        actual = actual.padre;
    }
    return false;
    }
    
    /* Verificar si una variable existe solo en el entorno actual, sin buscar en los entornos padres. */
    existeLocal(id) {
        return this.tabla.has(id);
    }
}
module.exports = Entorno;