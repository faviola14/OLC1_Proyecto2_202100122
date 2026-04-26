/* TablaTokens.js: Módulo para manejar la tabla de tokens y generar reportes en HTML. */
let listaTokens = [];

function inicializarTablaTokens() {
    listaTokens = [];
}

function getListaTokens() {
    return listaTokens;
}

function setListaTokens(lista) {
    listaTokens = lista;
}

function agregarToken(token) {
    listaTokens.push(token);
}

function limpiarTabla() {
    listaTokens = [];
}

function imprimirTabla() {
    console.log("Tabla de Tokens:");
    listaTokens.forEach((token, index) => {
    console.log(
        `${index + 1}. Tipo: ${token.tipo}, Lexema: ${token.lexema}, Fila: ${token.fila}, Columna: ${token.columna}`
    );
    });
}

function generarReporteHTML() {
    let html = `
    <html>
    <head><title>Reporte de Tokens</title></head>
    <body>
    <h1>Reporte de Tokens</h1>
    <table border="1">
    <tr>
        <th>No.</th>
        <th>Tipo</th>
        <th>Lexema</th>
        <th>Fila</th>
        <th>Columna</th>
    </tr>
    `;

    listaTokens.forEach((token, index) => {
    html += `
    <tr>
        <td>${index + 1}</td>
        <td>${token.tipo}</td>
        <td>${token.lexema}</td>
        <td>${token.fila}</td>
        <td>${token.columna}</td>
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


function crearReporteTokens() {
    const html = generarReporteHTML();
    guardarArchivoHTML(html, "reporte_tokens.html");
    console.log("Reporte de Tokens generado: reporte_tokens.html");
}

module.exports = {
    inicializarTablaTokens,
    getListaTokens,
    setListaTokens,
    agregarToken,
    limpiarTabla,
    imprimirTabla,
    generarReporteHTML,
    guardarArchivoHTML,
    crearReporteTokens
};