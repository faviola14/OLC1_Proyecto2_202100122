import Barra from "../components/Barra";
import Editor from "../components/Editor";
import Consola from "../components/Consola";
import Archivos from "../components/Archivos";
import "../styles/layout.css";


function Layout({ contenidoEditor, setContenidoEditor, ejecutar, output, reporteHTML, archivos,
  subirArchivo, seleccionarArchivo, fileInputRef, guardarArchivo, crearArchivo }) {
  return (
    <div className="container">
      <Archivos
        archivos={archivos}
        subirArchivo={subirArchivo}
        seleccionarArchivo={seleccionarArchivo}
        crearArchivo={crearArchivo} 
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