console.log("hola mundo")

const parser = require("./Interprete/parser");

console.log(parser.parse("func obtenerNumero() int {return 42}"));

/*
const express = require("express");
const cors = require("cors");


const parser = require("./Interprete/parser");

const app = express();
app.use(cors());
app.use(express.json());


app.post("/analizar", (req, res) => {
  const { codigo } = req.body;

  try {
    const resultado = parser.parse(codigo);

    res.json({
      ok: true,
      resultado
    });
  } catch (error) {
    res.json({
      ok: false,
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
*/