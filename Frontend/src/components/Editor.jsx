function Editor({ contenidoEditor, setContenidoEditor }) {
  return (
    <div className="editor">
      <textarea
        value={contenidoEditor}
        onChange={(e) => setContenidoEditor(e.target.value)}
        placeholder="Escribe tu código aquí..."
        style={{ width: "100%", height: "300px" }}
      />
    </div>
  );
}

export default Editor;