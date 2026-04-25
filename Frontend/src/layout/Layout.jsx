import Barra from "../components/Barra";
import Editor from "../components/Editor";
import Consola from "../components/Consola";
import Archivos from "../components/Archivos";
import "../styles/layout.css";


function Layout({ contenidoEditor, setContenidoEditor, ejecutar, output,reporteHTML}) {
  return (
     <div className="container">
      <Archivos />

        <div className="main">
        <Barra ejecutar={ejecutar} reporteHTML={reporteHTML} />

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