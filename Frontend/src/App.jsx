import { useState } from "react";
import Layout from "./layout/Layout";

function App() {

 
  const [contenidoEditor, setContenidoEditor] = useState("");

  
  const [output, setOutput] = useState("");

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
      } else {
        let salida = data.consola + "\n\nErrores:\n";
        data.errores.forEach(err => {
          salida += `[${err.tipo}] ${err.descripcion}\n`;
        });

        setOutput(salida);
      }

    } catch (error) {
      setOutput("Error de conexión con el servidor");
    }
  };

  return (
    <Layout
      contenidoEditor={contenidoEditor}
      setContenidoEditor={setContenidoEditor}
      ejecutar={ejecutar}
      output={output}
    />
  );
}

export default App;