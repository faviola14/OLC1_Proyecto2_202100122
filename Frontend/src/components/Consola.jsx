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