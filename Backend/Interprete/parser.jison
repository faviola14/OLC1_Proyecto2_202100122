/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */

/* COMENTARIOS*/
/\/\/.*                     { /* comentario de una línea */ }
/\/\*[^]*?\*\/              { /* comentario multilínea */ }

/* TIPOS DE DATOS */
"int"                       return 'INT';
"float64"                   return 'FLOAT';
"string"                    return 'STRING';
"bool"                      return 'BOOL';
"rune"                      return 'RUNE';

/* TIPOS COMPUESTOS */
"slice"                     return 'SLICE';
"struct"                    return 'STRUCT';

/* NULL */
"nil"                       return 'NULL';

/* AGRUPACIÓN */
"("                         return 'PARENTESIS_A';
")"                         return 'PARENTESIS_C';
"["                         return 'CORCHETE_A';
"]"                         return 'CORCHETE_C';

/* ASIGNACIÓN */
"+="                        return 'ASIGNA_MAS';
"-="                        return 'ASIGNA_MENOS';

/* PARA FOR */
"++"                        return 'INCREMENTO';
"--"                        return 'DECREMENTO';

/* ARITMÉTICA */
"/"                         return 'BARRA';
"%"                         return 'MODULO';
"*"                         return 'ASTERISCO';
"+"                         return 'MAS';

/* NEGACIÓN */
"-"                         return 'MENOS';

/* IGUALDAD Y DESIGUALDAD */
"=="                        return 'IGUALDAD';
"!="                        return 'DESIGUALDAD';

/* RELACIONALES */
">="                        return 'MAYOR_IGUAL';
"<="                        return 'MENOR_IGUAL';
">"                         return 'MAYOR';
"<"                         return 'MENOR';

/* LÓGICOS */
"!"                         return 'NOT';
"&&"                        return 'AND';
"||"                        return 'OR';

/* SENTENCIAS */
"var"                       return 'VAR';
"if"                        return 'IF';
"else"                      return 'ELSE';
"switch"                    return 'SWITCH';
"case"                      return 'CASE';
"default"                   return 'DEFAULT';
"fmt.Println"               return 'PRINT';
"for"                       return 'FOR';
"range"                     return 'RANGE';
"break"                     return 'BREAK';
"continue"                  return 'CONTINUE';
"return"                    return 'RETURN';
"slices.Index"              return 'INDEX';
"strings.Join"              return 'JOIN';
"len"                       return 'LEN';
"append"                    return 'APPEND';
"func"                      return 'FUNC';
"strconv.Atoi"              return 'ATOI';
"strconv.ParseFloat"        return 'PARSEFLOAT';
"reflect.TypeOf"            return 'TYPEOF';

/* OTROS SÍMBOLOS */
"="                         return 'IGUAL';
"{"                         return 'LLAVE_A';
"}"                         return 'LLAVE_C';
":"                         return 'DOS_PUNTOS';
":="                        return 'PUNTO_IGUAL';
","                         return 'COMA';
";"                         return 'PUNTO_COMA';
"."                         return 'PUNTO';

/* CADENA */
\"([^\"\\]|\\.)*\"          return 'CADENA';


/* NÚMEROS */
[0-9]+"."[0-9]+           return 'NUMERO_DECIMAL';
[0-9]+                    return 'NUMERO';

/* SECUENCIAS DE ESCAPE */
"\""                        return 'COMILLA_DOBLE';
"\\"                        return 'BARRA_INVERTIDA';
"\n"                        return 'SALTO_LINEA';
"\r"                        return 'RETORNO_CARRO';
"\t"                        return 'TABULACION';

/* ID */
[a-zA-Z_][a-zA-Z0-9_]*      return 'ID';

/* FIN DE DOCUMENTO */
<<EOF>>                     return 'EOF';

/* ERRORES */
.                           return 'INVALID';

/lex

/* operator associations and precedence */
%token CADENA ID NUMERO NUMERO_DECIMAL 
%token INT FLOAT STRING RUNE BOOL 
%token SLICE STRUCT 
%token NULL
%token COMILLA_DOBLE BARRA_INVERTIDA SALTO_LINEA RETORNO_CARRO TABULACION
%token PARENTESIS_A PARENTESIS_C CORCHETE_A CORCHETE_C 
%token ASIGNA_MAS ASIGNA_MENOS
%token BARRA MODULO ASTERISCO MAS 
%token MENOS
%token IGUALDAD DESIGUALDAD 
%token MAYOR MAYOR_IGUAL MENOR MENOR_IGUAL
%token NOT AND OR
%token VAR IF ELSE SWITCH CASE DEFAULT PRINT FOR RANGE BREAK CONTINUE RETURN INDEX JOIN LEN APPEND FUNC ATOI PARSEFLOAT TYPEOF
%token IGUAL LLAVE_A LLAVE_C DOS_PUNTOS PUNTO_IGUAL COMA PUNTO_COMA PUNTO INCREMENTO DECREMENTO 
%token EOF
%token INVALID 


%left PARENTESIS_A PARENTESIS_C CORCHETE_A CORCHETE_C 
%right NOT UMINUS
%left BARRA MODULO ASTERISCO
%left MAS MENOS 
%left MENOR MENOR_IGUAL MAYOR_IGUAL MAYOR
%left IGUALDAD DESIGUALDAD
%left AND



%start programa

%% /* language grammar */



programa: funciones EOF {}
;

funciones: funciones funcion
| funcion 
;

/* FUNCIONES */ 

funcion: FUNC ID PARENTESIS_A parametros PARENTESIS_C LLAVE_A instrucciones LLAVE_C
| FUNC ID PARENTESIS_A parametros PARENTESIS_C tipo LLAVE_A instrucciones retorno LLAVE_C
| FUNC ID PARENTESIS_A parametros PARENTESIS_C tipo LLAVE_A retorno LLAVE_C
;

parametros: parametros COMA parametro
| parametro
| /* vacío */
;

parametro: ID tipo
;

instrucciones: instrucciones instruccion
| instruccion
; 

instruccion: variable
| ifs
| switch
| for
| slice
| append
| modificacionslice
| matrices
| asignacionmatriz 
| struct 
| structuso
| structmodificacion
| print 
| asignacion 
;

/* RETURN */
retorno: RETURN valor
| RETURN
;

/* VARIABLES */
variable: VAR ID tipo IGUAL valor
| VAR ID tipo
| ID PUNTO_IGUAL valor
| inicializacion
;

inicializacion: ID IGUAL valor
;

tipo: INT
| FLOAT
| STRING
| BOOL
| RUNE
| CORCHETE_A CORCHETE_C tipo
;

valor: CADENA
| NUMERO_DECIMAL
| NUMERO
| operacion
| ID
| funcionesestructura
;

/* OPERACIONES */
operacion: operacion MAS operacionsimple
| operacion MENOS operacionsimple
| operacionsimple
;

operacionsimple: operacionsimple ASTERISCO operacionmenossimple
| operacionsimple BARRA operacionmenossimple
| operacionsimple MODULO operacionmenossimple
| operacionmenossimple
;

operacionmenossimple: MENOS operacionmenossimple %prec UMINUS
| PARENTESIS_A operacion PARENTESIS_C
| NUMERO
| NUMERO_DECIMAL
| ID
| funcionesestructura
| CADENA
;

/* ASIGNACIONES VARIABLES */
asignacion: ID ASIGNA_MAS valor
| ID ASIGNA_MENOS valor
;

/* IF */
ifs: if elseif else
| if elseif 
| if else
| if
;

if: IF condicion codigo
;

else: ELSE codigo
;

elseif: ELSE IF condicion codigo
;

codigo: LLAVE_A instrucciones LLAVE_C
;

condicion: expresionRelacional
| ID 
;

expresionRelacional: expresionRelacional OR expresionRelacional
| expresionRelacional AND expresionRelacional
| NOT expresionRelacional
| PARENTESIS_A expresionRelacional PARENTESIS_C
| comparacion
;

comparacion: valor IGUALDAD valor
| valor DESIGUALDAD valor
| valor MAYOR_IGUAL valor
| valor MENOR_IGUAL valor
| valor MAYOR valor
| valor MENOR valor
;

/* SWITCH */
switch: SWITCH expresionRelacional LLAVE_A cases default LLAVE_C
| SWITCH PARENTESIS_A expresionRelacional PARENTESIS_C LLAVE_A cases default LLAVE_C
| SWITCH expresionRelacional LLAVE_A cases LLAVE_C
| SWITCH PARENTESIS_A expresionRelacional PARENTESIS_C LLAVE_A cases LLAVE_C
;

cases: cases case
| case
;

case: CASE valor DOS_PUNTOS instruccionesswitch
;

default: DEFAULT DOS_PUNTOS instruccionesswitch 
;

instruccionesswitch: instruccionesswitch instruccionswitch 
| instruccionswitch
;

instruccionswitch: variable
| ifs
| switch
| for
| slice
| append
| modificacionslice
| matrices
| asignacionmatriz 
| struct 
| structuso
| structmodificacion
| print 
| asignacion 
| break
;

/* FOR */ 
for: FOR condicion instruccionesfor
| FOR inicializacion PUNTO_COMA condicion PUNTO_COMA ID mento instruccionesfor
| FOR ID COMA valor PUNTO_IGUAL RANGE ID instruccionesfor
;

instruccionesfor: instruccionesfor instruccionfor 
|instruccionfor
;

instruccionfor: variable
| ifs
| switch
| for
| slice
| append
| modificacionslice
| matrices
| asignacionmatriz 
| struct 
| structuso
| structmodificacion
| print 
| asignacion 
| break
| continue
;

mento: INCREMENTO
| DECREMENTO
;

/* BREAK */
break: BREAK
;

/* CONTINUE */
continue: CONTINUE
;

/* SLICE */
slice: ID PUNTO_IGUAL CORCHETE_A CORCHETE_C tipo CORCHETE_A elementos CORCHETE_C
| VAR ID CORCHETE_A CORCHETE_C tipo
;

elementos: elementos COMA valor
| valor
;

/* FUNCIONES DE ESTRUCTURAS */
funcionesestructura: index 
| join 
| len 
| accesoslice
| accesomatriz
| structacceso
| atoi 
| parsefloat 
| typeof 
;

/* SLICE.INDEX */
index: INDEX PARENTESIS_A ID COMA valor PARENTESIS_C
;

/* STRING.JOIN */
join: JOIN PARENTESIS_A ID COMA valor PARENTESIS_C
;

/* LEN */
len: LEN PARENTESIS_A ID PARENTESIS_C
;

/* APPEND */
append: ID IGUAL APPEND PARENTESIS_A ID COMA valor PARENTESIS_C
;

/* ACCESO SLICE */
accesoslice: ID posicionslice
;

/* MODIFICACION SLICE */
modificacionslice: posicionslice valor
;

posicionslice: PARENTESIS_A NUMERO PARENTESIS_C
;

/* MATRICES INICIALIZACION MULTIDIMENSIONAL */
matrices: ID PUNTO_IGUAL CORCHETE_A CORCHETE_C CORCHETE_A CORCHETE_C tipo LLAVE_A FILAS LLAVE_C
;

filas: filas COMA fila
| fila
;

fila: LLAVE_A elementos LLAVE_C
;

/* ASIGNACIÓN MATRICES */
asignacionmatriz: accesomatriz IGUAL valor
;

/* ACCESO MATRIZ */
accesomatriz: ID CORCHETE_A NUMERO CORCHETE_C CORCHETE_A NUMERO CORCHETE_C
;

/* STRUCT */
struct: STRUCT ID LLAVE_A atributos LLAVE_C
;

atributos: atributos atributo
| atributo
;

atributo: tipo ID PUNTO_COMA
;

/* USO STRUCT */
structuso: ID ID IGUAL LLAVE_A datos LLAVE_C PUNTO_COMA
;

datos: datos COMA dato
| dato
;

dato: ID DOS_PUNTOS valor
;

/* ACCESO STRUCT */
structacceso: ID PUNTO ID
;

/* MODIFICACION STRUCT */
structmodificacion: structacceso IGUAL valor PUNTO_COMA
;

/* PRINT */
print: PRINT PARENTESIS_A elementos PARENTESIS_C
;

/* ATOI */
atoi: ATOI PARENTESIS_A valor PARENTESIS_C
;

/* PARSEFLOAT */
parsefloat: PARSEFLOAT PARENTESIS_A valor PARENTESIS_C
;

/* TYPEOF */
typeof: ID PUNTO TYPEOF PARENTESIS_A valor PARENTESIS_C
;
