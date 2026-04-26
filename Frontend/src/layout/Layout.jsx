import Barra from "../components/Barra";
import Editor from "../components/Editor";
import Consola from "../components/Consola";
import Archivos from "../components/Archivos";
import "../styles/layout.css";
/* Layout.jsx: Componente principal que organiza la estructura de la aplicación. */

function Layout({ contenidoEditor, setContenidoEditor, ejecutar, output, reporteHTML, archivos,
  subirArchivo, seleccionarArchivo, fileInputRef, guardarArchivo, crearArchivo, eliminarArchivo, archivoActivo }) {
  return (
    <div className="container">
      <Archivos
        archivos={archivos}
        archivoActivo={archivoActivo}
        subirArchivo={subirArchivo}
        seleccionarArchivo={seleccionarArchivo}
        crearArchivo={crearArchivo}
        eliminarArchivo={eliminarArchivo}
        fileInputRef={fileInputRef}
      />

        <div className="main">
        <Barra ejecutar={ejecutar} reporteHTML={reporteHTML} guardarArchivo={guardarArchivo}/>

        <Editor
          contenidoEditor={contenidoEditor}
          setContenidoEditor={setContenidoEditor}
        />
        <Consola output={output} />

      </div>
      </div>
  );
}


export default Layout;