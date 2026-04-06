let listaErrores = [];

function inicializarTablaErrores() {
    listaErrores = [];
}

function getListaErrores() {
    return listaErrores;
}

function setListaErrores(lista) {
    listaErrores = lista;
}

function agregarError(error) {
    listaErrores.push(error);
}

function limpiarTabla() {
    listaErrores = [];
}

function imprimirTabla() {
    console.log("Tabla de Errores:");
    listaErrores.forEach((error, index) => {
    console.log(
        `${index + 1}. Tipo: ${error.tipo}, Descripción: ${error.descripcion}, Fila: ${error.fila}, Columna: ${error.columna}`
    );
    });
}

function generarReporteHTML() {
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

    listaErrores.forEach((error, index) => {
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



const fs = require("fs");

function guardarArchivoHTML(contenido, nombreArchivo) {
    fs.writeFileSync(nombreArchivo, contenido);
    console.log("Reporte generado:", nombreArchivo);
}

function crearReporteErrores() {
    const html = generarReporteHTML();
    guardarArchivoHTML(html, "reporte_errores.html");
    console.log("Reporte de errores creado: reporte_errores.html");
}

module.exports = {
    inicializarTablaErrores,
    getListaErrores,
    setListaErrores,
    agregarError,
    limpiarTabla,
    imprimirTabla,
    generarReporteHTML,
    guardarArchivoHTML,
    crearReporteErrores
};