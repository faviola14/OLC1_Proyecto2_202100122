# Gramática del Lenguaje

## Forma BNF

```bnf
...
<programa> ::= <funciones>

<funciones> ::= <funciones> <funcion> 
| <funcion> 

#FUNCIONES 
# func <nombreFuncion>() { // <cuerpo de la función> }
# func <nombreFuncion>(<param1> <tipo1>, <param2> <tipo2>) { // <cuerpo de la función> }
# func <nombreFuncion>(<param1> <tipo1>, <param2> <tipo2>) <tipoRetorno> { // <cuerpo de la función> return <valorDeRetorno> }

<funcion> ::= FUNC ID PARENTESIS_A <parametros> PARENTESIS_C LLAVE_A <instrucciones> LLAVE_C 
| FUNC ID PARENTESIS_A <parametros> PARENTESIS_C <tipo> LLAVE_A <instrucciones> <retorno> LLAVE_C 

<parametros> ::= <parametros> COMA <parametro>
|<parametro>
| ε

<parametro> ::= ID <tipo>

<instrucciones> ::= <instrucciones> <instruccion> 
| <instruccion> 

<instruccion> ::= <variable>
                | <ifs>
                | <switch>
                | <for>
                | <slice>
                | <append>
                | <modificacionslice>
                | <matrices>
                | <asignacionmatriz>
                | <struct>
                | <structuso>
                | <structmodificacion>
                | <print>
                | <asignacion>

# RETURN
<retorno> ::= RETURN <valor>
| RETURN

# VAR
# var <identificador> <Tipo> = <Expresión> 
# var <identificador> <Tipo>
# <identificador> := <Expresión>

<variable> ::= VAR ID <tipo> IGUAL <valor>
| VAR ID <tipo>
| ID PUNTO_IGUAL <valor>
| <inicializacion>

<inicializacion> ::= ID IGUAL <valor> 

<tipo> ::= INT
| FLOAT
| STRING
| BOOL
| RUNE
| CORCHETE_A CORCHETE_C <tipo>

<valor> ::= CADENA
| NUMERO_DECIMAL
| NUMERO 
| <operacion>
| ID 
| <funcionesestructura> 

# OPERACIONES
<operacion> ::= <operacion> MAS <operacionsimple>
| <operacion> MENOS <operacionsimple>
| <operacionsimple>

<operacionsimple> ::= <operacionsimple> ASTERISCO <operacionmenossimple>
| <operacionsimple> BARRA <operacionmenossimple>
| <operacionsimple> MODULO <operacionmenossimple>
| <operacionmenossimple>

<operacionmenossimple> ::= MENOS <operacionmenossimple>
| PARENTESIS_A <operacion> PARENTESIS_C
| NUMERO
| NUMERO_DECIMAL
| ID 
| <funcionesestructura> 
| CADENA

# ASIGNACIONES VARIABLES
<asignacion> ::= ID ASIGNA_MAS <valor>
| ID ASIGNA_MENOS <valor>

# IF 
# if condicion { // Bloque de sentencias para el if } else if condicion { // Bloque de sentencias para el else if } else { // Bloque de sentencias para el else }

<ifs> ::= <if> <elseif> <else>
| <if> <elseif>
| <if> <else>
| <if>

<if> ::= IF <condicion> <codigo>

<else> ::= ELSE <codigo>

<elseif> ::= ELSE IF <condicion> <codigo>

<codigo> ::= LLAVE_A <instrucciones> LLAVE_C

<condicion> ::= <expresionRelacional>
| ID 

<expresionRelacional> ::= <expresionRelacional> OR <expresionRelacional>
| <expresionRelacional> AND <expresionRelacional>
| NOT <expresionRelacional>
| PARENTESIS_A <expresionRelacional> PARENTESIS_C
| <comparacion>

<comparacion> ::= <valor> IGUALDAD <valor>
| <valor> DESIGUALDAD <valor>
| <valor> MAYOR_IGUAL <valor>
| <valor> MENOR_IGUAL <valor>
| <valor> MAYOR <valor>
| <valor> MENOR <valor>


# SWITCH
# switch <expresión> {
# case valor1:
# // Declaraciones ejecutadas si <expresión> == valor1
# case valor2:
# // Declaraciones ejecutadas si <expresión> == valor2
# // ...
# default:
# // Declaraciones ejecutadas si ningún caso coincide
# }

<switch> ::= SWITCH <expresionRelacional> LLAVE_A <cases> <default> LLAVE_C 
| SWITCH PARENTESIS_A <expresionRelacional> PARENTESIS_C LLAVE_A <cases> <default> LLAVE_C
| SWITCH <expresionRelacional> LLAVE_A <cases> LLAVE_C 
| SWITCH PARENTESIS_A <expresionRelacional> PARENTESIS_C LLAVE_A <cases>  LLAVE_C

<cases> ::= <cases> <case>
| <case>

<case> ::= CASE <valor> DOS_PUNTOS <instruccionesswitch> 

<default> ::= DEFAULT DOS_PUNTOS <instruccionesswitch>


<instruccionesswitch> ::= <instruccionesswitch> <instruccionswitch> 
| <instruccionswitch> 

<instruccionswitch> ::= <variable>
                | <ifs>
                | <switch>
                | <for>
                | <slice>
                | <append>
                | <modificacionslice>
                | <matrices>
                | <asignacionmatriz>
                | <struct>
                | <structuso>
                | <structmodificacion>
                | <print>
                | <asignacion>
                | <break> 

# FOR
# for <condición> { // Bloque de sentencias }
# for inicialización; condición; incremento { // Bloque de sentencias }
# for índice, valor := range slice { //...}


<for> ::= FOR <condicion> <instruccionesfor>
| FOR <inicializacion> PUNTO_COMA <condicion> PUNTO_COMA ID <mento> <instruccionesfor>
| FOR ID COMA <valor> PUNTO_IGUAL RANGE ID <instruccionesfor>

<instruccionesfor> ::= <instruccionesfor> <instruccionfor> 
| <instruccionfor> 

<instruccionfor> ::= <variable>
                | <ifs>
                | <switch>
                | <for>
                | <slice>
                | <append>
                | <modificacionslice>
                | <matrices>
                | <asignacionmatriz>
                | <struct>
                | <structuso>
                | <structmodificacion>
                | <print>
                | <asignacion>
                | <break>
                | <continue>

<mento> ::= INCREMENTO
| DECREMENTO

# BREAK
<break> ::= BREAK 

# CONTINUE
<continue> ::= CONTINUE

# SLICE 
# numbers := []int {1, 2, 3, 4, 5};
# var slice []int

<slice> ::= ID PUNTO_IGUAL CORCHETE_A CORCHETE_C <tipo> CORCHETE_A <elementos> CORCHETE_C 
| VAR ID CORCHETE_A CORCHETE_C <tipo>

<elementos> ::= <elementos> COMA <valor>
|<valor>

# FUNCIONES DE ESTRUCTURAS
<funcionesestructura> ::= <index>
| <join>
| <len>
| <accesoslice>
| <accesomatriz>
| <structacceso>
| <atoi>
| <parsefloat>
| <typeof>

# SLICE.INDEX slices.Index(numeros, 30)
<index> ::= INDEX PARENTESIS_A ID COMA <valor> PARENTESIS_C

# STRING.JOIN strings.Join(palabras, " ")
<join> ::= JOIN PARENTESIS_A ID COMA <valor> PARENTESIS_C

# LEN len(numeros)
<len> ::= LEN PARENTESIS_A ID PARENTESIS_C

# APPEND numeros = append(numeros, 4)
<append> ::= ID IGUAL APPEND PARENTESIS_A ID COMA <valor> PARENTESIS_C

# ACCESO SLICE numeros[2]
<accesoslice> ::= ID <posicionslice>

# MODIFICACIÓN SLICE numeros[2] = 100
<modificacionslice> ::= <posicionslice> <valor>

<posicionslice> ::=  PARENTESIS_A NUMERO PARENTESIS_C

#MATRICES INICIALIZACIÓN MATRIZ MULTIDIMENSIONAL
# mtx2 := [][]int{ {0, 0, 0}, // Fila 1 {0, 0, 0}, // Fila 2 {0, 0, 0}, // Fila 3 }

<matrices> ::= ID PUNTO_IGUAL CORCHETE_A CORCHETE_C CORCHETE_A CORCHETE_C <tipo> LLAVE_A <filas> LLAVE_C

<filas> ::= <filas> COMA <fila>
|<fila>

<fila> ::= LLAVE_A <elementos> LLAVE_C

#ASIGNACIÓN MATRICES mtx2[0][0] = 7
<asignacionmatriz> ::= <accesomatriz> IGUAL <valor> 

# ACCESO MATRIZ mtx2[0][1]
<accesomatriz> ::= ID CORCHETE_A NUMERO CORCHETE_C CORCHETE_A NUMERO CORCHETE_C

# STRUC 
# struct <NombreStruct> { <Tipo> <NombreAtributo>; ... }

<struct> ::= STRUCT ID  LLAVE_A <atributos> LLAVE_C

<atributos> ::= <atributos> <atributo>
|<atributo>

<atributo> ::= <tipo> ID PUNTO_COMA

# USO STRUCT Persona miInstancia = { Nombre: "Alice", Edad: 25, EsEstudiante: false };

<structuso> ::= ID ID IGUAL LLAVE_A <datos> LLAVE_C PUNTO_COMA

<datos> ::= <datos> COMA <dato>
| <dato>

<dato> ::= ID DOS_PUNTOS <valor>

# ACCESO STRUCT miInstancia.Nombre
<structacceso> ::= ID PUNTO ID

# MODIFICACION STRUCT miInstancia.Nombre = "Bob"; 
<structmodificacion> ::= <structacceso> IGUAL <valor> PUNTO_COMA

# PRINT fmt.Println("cadena1", "cadena2")
<print> ::= PRINT PARENTESIS_A <elementos> PARENTESIS_C

# ATOI strconv.Atoi("123")
<atoi> ATOI PARENTESIS_A <valor> PARENTESIS_C

# PARSEFLOAT strconv.ParseFloat("123.45")
<parsefloat> PARSEFLOAT PARENTESIS_A <valor> PARENTESIS_C

#TYPEOF
<typeof> ID PUNTO TYPEOF PARENTESIS_A <valor> PARENTESIS_C

```
