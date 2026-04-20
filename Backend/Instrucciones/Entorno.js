class Entorno {
    constructor(padre = null) {
        this.tabla = new Map();
        this.padre = padre;
        this.errores = [];
    }

    declarar(id, valor) {
        if (this.tabla.has(id)) {
            this.errores.push(`Variable ya definida: ${id}`);
            throw new Error("Variable ya definida: " + id);
        } else {
            this.tabla.set(id, valor);
        }
    }

    obtener(id) {
    let actual = this;
    while (actual != null) {
        if (actual.tabla.has(id)) {
            //console.log("GET:", id, actual.tabla.get(id));
            return actual.tabla.get(id);
        }
        actual = actual.padre;
    }
    console.log("GET FALLÓ:", id);
    throw new Error("Variable no definida: " + id);
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
        throw new Error("Variable no definida: " + id);
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