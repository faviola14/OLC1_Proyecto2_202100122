console.log("hola mundo")

const parser = require("./Parser/parser");
const Interpretador = require("./Interprete/Interpretador");


/*`func x() {
valor := 10
fmt.Println(valor)
valor = 200
fmt.Println(valor)
valor += 15
fmt.Println(valor)
valor -= 15
fmt.Println(valor)
}
x()

`*/

const cod2 = `func x() {
numero := 1
switch numero {
case 1:
fmt.Println("Uno") // Se ejecuta si numero == 1
case 2:
fmt.Println("Dos") // Se ejecuta si numero == 2
case 3:
fmt.Println("Tres") // Se ejecuta si numero == 3
default:
fmt.Println("Número inválido") // Se ejecuta si ninguno de los casos coincide
}
}
x()

`;

const ast = parser.parse(cod2);


/*console.log("RESULTADO FINAL:");
console.log(ast);
console.log("TIPO:", typeof ast);*/

//console.log(JSON.stringify(ast, null, 2));
const resultado= Interpretador(ast);

console.log();





const codigo = `
func main() {
// Variable global
var a float64 = 5 
var valor int
var valor2_1 float64 = 10 + 1
valor3 := "esto es una variable"
valor3 = "otra cadena"
i := 10 ¿
/*
Esto es un comentario multilínea
*/
z := 0
// Imprime 10
fmt.Println("Valor de i en el ámbito global:", i)


var condicion bool = true
if condicion {
// Bloque de sentencias para el if
str :="cad"
str += "cad"
} else if condicion {
// Bloque de sentencias para el else if
str :="cad"
str += "cad"
} else {
// Bloque de sentencias para el else
var var1 int = 10
var1 -= 10
}
numero:= 1
switch numero {
case 1:
fmt.Println("Uno") // Se ejecuta si numero == 1
case 2:
fmt.Println("Dos") // Se ejecuta si numero == 2
case 3:
fmt.Println("Tres") // Se ejecuta si numero == 3
default:
fmt.Println("Número inválido") // Se ejecuta si ninguno de los casos coincide
}

w := 1
for w <= 5 {
fmt.Println(w)
w++
}

for w := 1; w <= 5; w++ {
fmt.Println(w)
}

numeros := []int{10, 20, 30, 40, 50}
for indice, valor := range numeros {
fmt.Println("índice:", indice, "valor:", valor)
}

for i := 0; i < 10; i++ {
if i == 5 {
fmt.Println("Se encontró un break en i =", i)
break // Finaliza el bucle cuando i es igual a 5
}
break // Finaliza el bucle cuando i es igual a 5
fmt.Println(i)
}
for i := 1; i <= 5; i++ {
if i % 2 == 0 {
continue // Salta a la siguiente iteración si i es par
}
continue
fmt.Println(i) // Solo imprime números impares
}



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
z := 10 % 3
// Imprime 40
fmt.Println("Valor de z en el bloque independiente:", z)
}
// Imprime 0
fmt.Println("Valor de z fuera del bloque independiente:", z)
// Imprime 30
fmt.Println("Valor de i fuera del bloque:", i)
// fmt.Println("Valor de j fuera del bloque:", j) // Error: j no es accesible aquí
}

func suma(a int, b int) int {
// Declaración con inicialización de valores
numbers = []int {1, 2, 3, 4, 5};
// Declaración de slice vacío
var slice1 []int
slice1 = numbers
fmt.Println(slices.Index(numbers, 30)) // Salida: 2

palabras := []string{"hola", "mundo", "go"}
fmt.Println(strings.Join(palabras, " ")) // Salida: "hola mundo go"
fmt.Println(len(numbers)) // Salida: 5
numbers = append(numbers, 4)
fmt.Println(numbers)
fmt.Println("Elemento en índice 2:", numbers[2]) 
numbers[2] = 100

mtx2 := [][]int{
{0, 0, 0}, // Fila 1
{0, 0, 0}, // Fila 2
{0, 0, 0}, // Fila 3
}
mtx2[0][0] = 7
fmt.Println(mtx2[0][0])

mtx1 := [][]int{
{1, 2, 3},
{4, 5, 6},
{7, 8, 9},
}

mtx1 = append(mtx1, numbers)
fmt.Println(mtx1[3][2])

matriz := [][]int{
{1, 2, 3}, // Slice con 3 elementos
{4, 5}, // Slice con 2 elementos
{6, 7, 8, 9}, // Slice con 4 elementos
}

struct Persona {
string Nombre;
int Edad;
bool EsEstudiante;
}
Persona miInstancia = { Nombre: "Alice", Edad: 25, EsEstudiante: false };
// Acceso a atributos
//string nombre = miInstancia.Nombre;
miInstancia.Nombre = "Bob";

return a + b // Retorna la suma de a y b
}
struct Persona {
string Nombre;
int Edad;
bool EsEstudiante;
}
func x() {
resultado := suma(3, 7)
fmt.Println("Resultado:", resultado)
}
`;

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