class Consola {
    static salida = [];

    static log(...valores) {
        this.salida.push(valores.join(" "));
    }

    static limpiar() {
        this.salida = [];
    }

    static getSalida() {
        return this.salida.join("\n");
    }
}

module.exports = Consola;