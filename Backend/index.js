console.log("hola mundo")

const parser = require("./Interprete/parser");

const codigo = `
func main() {
// Variable global
i := 10 ¿
z := 0
// Imprime 10
fmt.Println("Valor de i en el ámbito global:", i)
// Bloque independiente
{
// Variable local al bloque
j := 20
// Imprime 20
fmt.Println("Valor de j en el bloque independiente:", j)
// Imprime 10
fmt.Println("Acceso a i desde el bloque independiente:", i)
// Modifica i usando j
i = i + j
// Imprime 30
fmt.Println("Nuevo valor de i después de modificarlo en el bloque:", i)
// Variable con el mismo nombre que variable en entorno superior
z := 40
// Imprime 40
fmt.Println("Valor de z en el bloque independiente:", z)
}
// Imprime 0
fmt.Println("Valor de z fuera del bloque independiente:", z)
// Imprime 30
fmt.Println("Valor de i fuera del bloque:", i)
// fmt.Println("Valor de j fuera del bloque:", j) // Error: j no es accesible aquí
}
`;

console.log(parser.parse(codigo));

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