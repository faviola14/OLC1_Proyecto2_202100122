# Gramática del Lenguaje

## Forma BNF

```bnf
...
<programa> ::= <funciones> <instrucciones> EOF

<funciones> ::= <funciones> <funcion> 
| <funcion> 

#FUNCIONES 
# func <nombreFuncion>() { // <cuerpo de la función> }
# func <nombreFuncion>(<param1> <tipo1>, <param2> <tipo2>) { // <cuerpo de la función> }
# func <nombreFuncion>(<param1> <tipo1>, <param2> <tipo2>) <tipoRetorno> { // <cuerpo de la función> return <valorDeRetorno> }

<funcion> ::= FUNC ID PARENTESIS_A <parametros> PARENTESIS_C LLAVE_A <instrucciones> LLAVE_C 
| FUNC ID PARENTESIS_A <parametros> PARENTESIS_C <tipo> LLAVE_A <instrucciones> <retorno> LLAVE_C
| FUNC ID PARENTESIS_A <parametros> PARENTESIS_C <tipo> LLAVE_A <retorno> LLAVE_C  
| <struct>

<parametros> ::= <parametros> COMA <parametro>
|<parametro>
| ε

<parametro> ::= ID <tipo>

<instrucciones> ::= <instrucciones> <instruccion> PUNTO_COMA 
| <instrucciones> <instruccion> 
| <instruccion> PUNTO_COMA;
| <instruccion> 
| ε

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
                | <accesofunc>
                | <break>
                | <continue>
                | <bloqueindependiente>

# RETURN
<retorno> ::= RETURN <valor>
| RETURN

# BLOQUE INDEPENDIENTE {instrucciones}
<bloqueindependiente> ::= LLAVE_A <instrucciones> LLAVE_C


# VAR
# var <identificador> <Tipo> = <Expresión> 
# var <identificador> <Tipo>
# <identificador> := <Expresión>

<variable> ::= VAR ID <tipo> IGUAL <valor>
| VAR ID <tipo>
| ID PUNTO_IGUAL <valor>

<tipo> ::= INT
| FLOAT
| STRING
| BOOL
| RUNE
| CORCHETE_A CORCHETE_C <tipo>

<valor> ::= operacion
| CADENA
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
| TRUE 
| FALSE
| RUNEp

# ASIGNACIONES VARIABLES
<asignacion> ::= ID IGUAL <operacion>
| ID ASIGNA_MAS <operacion>
| ID ASIGNA_MENOS <operacion>

# IF 
# if condicion { // Bloque de sentencias para el if } else if condicion { // Bloque de sentencias para el else if } else { // Bloque de sentencias para el else }

<ifs> ::= <if> <elseif> <else>
| <if> <elseif>
| <if> <else>
| <if>

<if> ::= IF <expresionRelacional> <codigo>
| IF ID <codigo>

<else> ::= ELSE <codigo>

<elseif> ::= ELSE IF <expresionRelacional> <codigo>
| ELSE IF <expresionRelacional> <codigo>

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

<switch> ::= SWITCH <condicion> LLAVE_A <cases> <default> LLAVE_C 
| SWITCH PARENTESIS_A <condicion> PARENTESIS_C LLAVE_A <cases> <default> LLAVE_C
| SWITCH <condicion> LLAVE_A <cases> LLAVE_C 
| SWITCH PARENTESIS_A <condicion> PARENTESIS_C LLAVE_A <cases>  LLAVE_C

<cases> ::= <cases> <case>
| <case>

<case> ::= CASE <valor> DOS_PUNTOS <instruccionesswitch> 

<default> ::= DEFAULT DOS_PUNTOS <instruccionesswitch>


<instruccionesswitch> ::= <instruccionesswitch> <instruccionswitch> 
| <instruccionesswitch> <instruccionswitch> PUNTO_COMA
| <instruccionswitch> 
| <instruccionswitch> PUNTO_COMA
| ε
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
                | <accesofunc>
                | <break>
                | <continue>

# FOR
# for <condición> { // Bloque de sentencias }
# for inicialización; condición; incremento { // Bloque de sentencias }
# for índice, valor := range slice { //...}


<for> ::= FOR <expresionRelacional> LLAVE_A <instruccionesfor> LLAVE_C
| FOR ID LLAVE_A <instruccionesfor> LLAVE_C
| FOR <inicializacion> PUNTO_COMA <expresionRelacional> PUNTO_COMA <mento> LLAVE_A <instruccionesfor> LLAVE_C
| FOR ID PUNTO_COMA <expresionRelacional> PUNTO_COMA <mento> LLAVE_A <instruccionesfor> LLAVE_C
| FOR ID COMA ID PUNTO_IGUAL RANGE ID LLAVE_A <instruccionesfor> LLAVE_C

<inicializacion> ::= ID PUNTO_IGUAL <valor>

<instruccionesfor> ::= <instruccionesfor> <instruccionfor> 
| <instruccionesfor> <instruccionfor> PUNTO_COMA
| <instruccionfor> 
| <instruccionfor> PUNTO_COMA
| ε

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
                | <accesofunc>
                | <break>
                | <continue>

<mento> ::= ID INCREMENTO
| ID DECREMENTO

# BREAK
<break> ::= BREAK 

# CONTINUE
<continue> ::= CONTINUE

# SLICE 
# numbers := []int {1, 2, 3, 4, 5};
# var slice []int

<slice> ::= ID IGUAL  <tipo> CORCHETE_A <elementos> CORCHETE_C 
| ID PUNTO_IGUAL  <tipo> CORCHETE_A <elementos> CORCHETE_C
| VAR ID  <tipo>

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
| <accesofunc>

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
<modificacionslice> ::= ID <posicionslice> IGUAL <valor>

<posicionslice> ::=  CORCHETE_A NUMERO CORCHETE_C

#MATRICES INICIALIZACIÓN MATRIZ MULTIDIMENSIONAL
# mtx2 := [][]int{ {0, 0, 0}, // Fila 1 {0, 0, 0}, // Fila 2 {0, 0, 0}, // Fila 3 }

<matrices> ::= ID PUNTO_IGUAL CORCHETE_A CORCHETE_C CORCHETE_A CORCHETE_C <tipo> LLAVE_A <filas> LLAVE_C

<filas> ::= <filas> COMA <fila>
| <filas> COMA
| <fila>

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

# USO STRUCT Persona miInstancia = { Nombre: "Alice", Edad: 25, EsEstudiante: false }

<structuso> ::= ID ID IGUAL LLAVE_A <datos> LLAVE_C 

<datos> ::= <datos> COMA <dato>
| <dato>

<dato> ::= ID DOS_PUNTOS <valor>

# ACCESO STRUCT miInstancia.Nombre
<structacceso> ::= ID PUNTO ID

# MODIFICACION STRUCT miInstancia.Nombre = "Bob"
<structmodificacion> ::= <structacceso> IGUAL <valor> 

# PRINT fmt.Println("cadena1", "cadena2")
<print> ::= PRINT PARENTESIS_A <elementos> PARENTESIS_C

# ATOI strconv.Atoi("123")
<atoi>  ::= ATOI PARENTESIS_A <valor> PARENTESIS_C

# PARSEFLOAT strconv.ParseFloat("123.45")
<parsefloat>  ::= PARSEFLOAT PARENTESIS_A <valor> PARENTESIS_C

#TYPEOF
<typeof> ::=  ID PUNTO TYPEOF PARENTESIS_A <valor> PARENTESIS_C

# acceso función suma(3, 7)
<accesofunc> ::= ID PARENTESIS_A <elementos> PARENTESIS_C
| ID PARENTESIS_A PARENTESIS_C



```
