console.log("hola mundo")
const parser = require("./Parser/parser");
const Interpretador = require("./Interprete/Interpretador");
const { generarAST } = require('./Reports/AST');
const fs = require("fs");
const { exec } = require("child_process");
const Consola = require("./Reports/Consola");
const Errores = require("./Reports/Errores");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/reportes", express.static(__dirname));

app.post("/analizar", (req, res) => {
  const { codigo } = req.body;
  try {
    Consola.limpiar();
    Errores.limpiar();
    const ast = parser.parse(codigo);
    const dot = generarAST(ast);
    fs.writeFileSync("ast.dot", dot);
    exec("dot -Tpdf ast.dot -o ast.pdf");
    const resultado = Interpretador(ast);
    const htmlErrores = Errores.generarReporteHTML();

    res.json({
      ok: true,
      consola: Consola.getSalida(),
      errores: Errores.getErrores(),
      htmlErrores
    });
  } catch (error) {
    Errores.agregar("Sintáctico", error.message);
    res.json({
      ok: false,
      consola: Consola.getSalida(),
      errores: Errores.getErrores(),
      htmlErrores: Errores.generarReporteHTML()
    });
  }
  Errores.crearReporteErrores();
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
