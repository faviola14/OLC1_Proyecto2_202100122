function Barra({ ejecutar, reporteHTML, guardarArchivo }) {
  return (
    <div className="barra">
      <button className="btn ejecutar" onClick={ejecutar}>Ejecutar</button>

      <button className="btn" onClick={guardarArchivo}>
        Guardar
      </button>

      <button
        className="btn"
        onClick={() => window.open("http://localhost:3000/reportes/ast.pdf", "_blank")}>
        Árbol AST
      </button>

      <button
        className="btn"
        onClick={() => window.open("http://localhost:3000/reportes/reporte_tokens.html", "_blank")}>
        Tabla de Tokens
      </button>

      <button
        className="btn"
        onClick={() => window.open("http://localhost:3000/reportes/reporte_simbolos.html", "_blank")}>
        Tabla de Símbolos
      </button>

      <button
        className="btn error"
        onClick={() => {
          const blob = new Blob([reporteHTML], { type: "text/html" });
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        }}
      >
        Tabla de Errores
      </button>
    </div>
  );
}

export default Barra;