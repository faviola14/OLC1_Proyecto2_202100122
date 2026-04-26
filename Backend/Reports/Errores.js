/* Errores.js: Módulo para manejar la lista de errores y generar reportes en HTML. */
const fs = require("fs");

class Errores {
    static lista = [];

    static agregar(tipo, descripcion, fila = null, columna = null) {
        this.lista.push({
            tipo,
            descripcion,
            fila,
            columna
        });
    }

    static limpiar() {
        this.lista = [];
    }

    static getErrores() {
        return this.lista;
    }

    static imprimirTabla() {
        console.log("Tabla de Errores:");
        listaErrores.forEach((error, index) => {
        console.log(
            `${index + 1}. Tipo: ${error.tipo}, Descripción: ${error.descripcion}, Fila: ${error.fila}, Columna: ${error.columna}`
        );
        });
    }

    static generarReporteHTML() {
        let html = `
        <html>
        <head><title>Reporte de Errores</title></head>
        <body>
        <h1>Reporte de Errores</h1>
        <table border="1">
            <tr>
            <th>No.</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Fila</th>
            <th>Columna</th>
            </tr>
        `;
        this.lista.forEach((error, index) => {
        html += `
            <tr>
            <td>${index + 1}</td>
            <td>${error.tipo}</td>
            <td>${error.descripcion}</td>
            <td>${error.fila}</td>
            <td>${error.columna}</td>
            </tr>
        `;
        });
        html += `</table></body></html>`;
        return html; 
    }

    static guardarArchivoHTML(contenido, nombreArchivo) {
        fs.writeFileSync(nombreArchivo, contenido);
        console.log("Reporte generado:", nombreArchivo);
    }

    static crearReporteErrores() {
        const html = this.generarReporteHTML();
        this.guardarArchivoHTML(html, "reporte_errores.html");
        console.log("Reporte de errores creado: reporte_errores.html");
    }
}

module.exports = Errores;