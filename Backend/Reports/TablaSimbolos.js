let listaSimbolos = [];

function inicializarTablaSimbolos() {
  listaSimbolos = [];
}
function getListaSimbolos() {
    return listaSimbolos;
}
function setListaSimbolos(lista) {
    listaSimbolos = lista;
}
function agregarSimbolo(simbolo) {
    listaSimbolos.push(simbolo);
}
function limpiarTabla() {
    listaSimbolos = [];
}
function imprimirTabla() {
    console.log("Tabla de Simbolos:");
    listaSimbolos.forEach((simbolo, index) => {
        console.log(
            `${index + 1}. ID: ${simbolo.id}, Tipo Simbolo: ${simbolo.tipoSimbolo}, Tipo Dato: ${simbolo.tipoDato}, Ambito: ${simbolo.ambito}, Fila: ${simbolo.fila}, Columna: ${simbolo.columna}`
        );
    });
}
function generarReporteHTML() {
    let html = `
    <html>
    <head><title>Reporte de Simbolos</title></head>
    <body>
    <h1>Reporte de Simbolos</h1>
    <table border="1">
    <tr>
        <th>No.</th>
        <th>ID</th>
        <th>Tipo Simbolo</th>
        <th>Tipo Dato</th>
        <th>Ambito</th>
        <th>Fila</th>
        <th>Columna</th>
    </tr>
    `;    
    listaSimbolos.forEach((simbolo, index) => {
        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${simbolo.id}</td>
            <td>${simbolo.tipoSimbolo}</td>
            <td>${simbolo.tipoDato}</td>
            <td>${simbolo.ambito}</td>
            <td>${simbolo.fila}</td>
            <td>${simbolo.columna}</td>
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

function crearReporteSimbolos() {
    const html = generarReporteHTML();
    guardarArchivoHTML(html, "reporte_simbolos.html");
    console.log("Reporte de simbolos creado: reporte_simbolos.html");
}

module.exports = {
    inicializarTablaSimbolos,
    getListaSimbolos,
    setListaSimbolos,
    agregarSimbolo,
    limpiarTabla,
    imprimirTabla,
    generarReporteHTML,
    guardarArchivoHTML,
    crearReporteSimbolos
};