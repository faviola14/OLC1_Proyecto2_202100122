/* Archivos.jsx: Componente para gestionar la lista de archivos, incluyendo selección, eliminación, 
creación y subida de archivos. */
function Archivos({ archivos, seleccionarArchivo, eliminarArchivo, crearArchivo, subirArchivo, fileInputRef, archivoActivo }) {
  return (
    <div className="archivos">
      <h3>Archivos</h3>

      <button className="btnA" onClick={() => fileInputRef.current.click()}>
        + Subir Archivo
      </button>

      <button className="btnA" onClick={crearArchivo}>
        + Nuevo Archivo
      </button>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={subirArchivo}
      />

      <ul> 
        {archivos.map((archivo, index) => ( 
          <li key={index} className={`archivo-item ${archivoActivo?.nombre === archivo.nombre ? "activo" : ""}`}>
            
            <span onClick={() => seleccionarArchivo(archivo)}>
              💜 {archivo.nombre}
            </span>

            <button
              className="btn-eliminar"
              onClick={() => eliminarArchivo(archivo)}
            >
              ❌
            </button>

          </li>
          
        ))}
      </ul>
    </div>
  );
}

export default Archivos;