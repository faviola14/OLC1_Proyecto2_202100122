function Barra({ ejecutar }) {
  return (
    <div className="barra">
      <button onClick={ejecutar}>Ejecutar</button>
      <button>Árbol AST</button>
      <button>Reporte Tabla de Símbolos</button>
      <button>Reporte Errores</button>
    </div>
  );
}

export default Barra;