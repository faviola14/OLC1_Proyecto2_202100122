import Barra from "../components/Barra";
import Editor from "../components/Editor";
import Consola from "../components/Consola";
import Archivos from "../components/Archivos";
import "../styles/layout.css";

function Layout() {
  return (
    <div className="container">
      <Archivos />

      <div className="main">
        <Barra />
        <Editor />
        <Consola />
      </div>
    </div>
  );
}

export default Layout;