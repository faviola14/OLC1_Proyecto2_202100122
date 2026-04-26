/* Consola.js: Módulo para manejar la salida de la consola en los reportes. */
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