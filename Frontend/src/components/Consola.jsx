/* Consola.jsx: Componente para mostrar la salida de la ejecución del código, incluyendo errores y 
resultados. */
function Consola({ output }) {
  return (
    <div className="consola">
      <h4 className="nombreConsola"> Consola</h4>
      <div className="output">
        <pre>{output}</pre>
      </div>
    </div>
  );
}
export default Consola;