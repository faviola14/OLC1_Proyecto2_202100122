import Layout from "./layout/Layout";
import { useState, useRef } from "react";

function App() {

  const [contenidoEditor, setContenidoEditor] = useState("");
  const [reporteHTML, setReporteHTML] = useState("");
  const [archivos, setArchivos] = useState([]);
  const [archivoActivo, setArchivoActivo] = useState(null);
  const [output, setOutput] = useState("");

  const fileInputRef = useRef(null);
  const ejecutar = async () => {
    try {
      const res = await fetch("http://localhost:3000/analizar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          codigo: contenidoEditor
        })
      });
      const data = await res.json();
      if (data.ok) {
        let salida = data.consola;
        if (data.errores.length > 0) {
          salida += "\n\nErrores:\n";
          data.errores.forEach(err => {
            salida += `[${err.tipo}] ${err.descripcion}\n`;
          });
        }
        setOutput(salida);
        setReporteHTML(data.htmlErrores);
      } else {
        let salida = data.consola + "\n\nErrores:\n";
        data.errores.forEach(err => {
          salida += `[${err.tipo}] ${err.descripcion}\n`;
        });
        setOutput(salida);
        setReporteHTML(data.htmlErrores);
      }
    } catch (error) {
      setOutput("Error de conexión con el servidor");
    }
  };

  const subirArchivo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
      reader.onload = (event) => {
        const nuevoArchivo = {
          nombre: file.name,
          contenido: event.target.result
        };
        setArchivos(prev => {
          if (prev.some(a => a.nombre === file.name)) return prev;
          return [...prev, nuevoArchivo];
        });
        setArchivoActivo(nuevoArchivo);
        setContenidoEditor(nuevoArchivo.contenido);
        e.target.value = null;
      };
      reader.readAsText(file);
  };
  

  const seleccionarArchivo = (archivo) => {
    //console.log("Seleccionado:", archivo);
    setArchivoActivo(archivo);
    setContenidoEditor(archivo.contenido);
  };

  const actualizarContenido = (texto) => {
    setContenidoEditor(texto);
    if (!archivoActivo) return;
    setArchivos(prev =>
      prev.map(a =>
        a.nombre === archivoActivo.nombre
          ? { ...a, contenido: texto }
          : a
      )
    );
  };


  const guardarArchivo = () => {
  if (!archivoActivo) {
    alert("No hay archivo seleccionado");
    return;
  }
  const blob = new Blob([contenidoEditor], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = archivoActivo.nombre;
  a.click();
  URL.revokeObjectURL(url);
};

  const crearArchivo = () => {
    const nombre = prompt("Nombre del archivo:");
    if (!nombre) return;
    const nuevoArchivo = {
      nombre,
      contenido: ""
    };
    setArchivos(prev => [...prev, nuevoArchivo]);
    setArchivoActivo(nuevoArchivo);
    setContenidoEditor("");
  };

  const eliminarArchivo = (archivo) => {
  const confirmacion = confirm(`¿Eliminar ${archivo.nombre}?`);
  if (!confirmacion) return;
  setArchivos(prev => prev.filter(a => a.nombre !== archivo.nombre));
  if (archivoActivo?.nombre === archivo.nombre) {
    setArchivoActivo(null);
    setContenidoEditor("");
  }
};

  return (
    <Layout
      contenidoEditor={contenidoEditor}
      setContenidoEditor={actualizarContenido}
      ejecutar={ejecutar}
      output={output}
      reporteHTML={reporteHTML}

      archivos={archivos}
      subirArchivo={subirArchivo}
      seleccionarArchivo={seleccionarArchivo}
      fileInputRef={fileInputRef}
      guardarArchivo={guardarArchivo}
      crearArchivo={crearArchivo}
      archivoActivo={archivoActivo}
      eliminarArchivo={eliminarArchivo}
    />
  );
}

export default App;