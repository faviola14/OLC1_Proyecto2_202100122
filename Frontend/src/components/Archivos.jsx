function Archivos({archivos, subirArchivo, seleccionarArchivo, crearArchivo, fileInputRef }) {
  return (
    <div className="archivos">
      <h3>Archivos</h3>

      <input
        type="file"
        accept=".gst,.txt"
        onChange={subirArchivo}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      <button
        className="btnA"
        onClick={() => fileInputRef.current.click()}
      >
        + Subir Archivo
      </button>

      <button className="btnA" onClick={crearArchivo}>
        + Nuevo Archivo
      </button>

      <ul>
        {archivos.map((archivo, index) => (
          <li
            key={index}
            onClick={() => seleccionarArchivo(archivo)}
            style={{ cursor: "pointer" }}
          >
            {archivo.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Archivos;