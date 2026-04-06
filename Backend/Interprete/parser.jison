%{
    const TablaTokens = require('../Reports/TablaTokens');
    const TablaSimbolos = require('../Reports/TablaSimbolos');
    const TablaErrores = require('../Reports/TablaErrores');
%}
/* lexical grammar */
%lex
%%

\s+                   {/* skip whitespace */}

/* COMENTARIOS*/
"//".*                    { /* comentario de una línea */ }
"/*"[^]*?"*/"             { /* comentario multi-línea */ }

/* TIPOS DE DATOS */
"int"                       { 
                            TablaTokens.agregarToken({tipo: "INT",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'INT';
                            }
"float64"                   { TablaTokens.agregarToken({tipo: "FLOAT",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'FLOAT';
                            }
"string"                    { TablaTokens.agregarToken({tipo: "STRING",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'STRING';
                            }
"bool"                      { TablaTokens.agregarToken({tipo: "BOOL",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'BOOL';
                            }
"rune"                      { TablaTokens.agregarToken({tipo: "RUNE",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'RUNE';
                            }

/* TIPOS COMPUESTOS */
"slice"                     { TablaTokens.agregarToken({tipo: "SLICE",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'SLICE';
                            }
"struct"                    { TablaTokens.agregarToken({tipo: "STRUCT",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'STRUCT';
                            }

/* NULL */
"nil"                       { TablaTokens.agregarToken({tipo: "NULL",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'NULL';
                            }

/* AGRUPACIÓN */
"("                         { TablaTokens.agregarToken({tipo: "PARENTESIS_A",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'PARENTESIS_A';
                            }
")"                         { TablaTokens.agregarToken({tipo: "PARENTESIS_C",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'PARENTESIS_C';
                            }
"["                         { TablaTokens.agregarToken({tipo: "CORCHETE_A",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'CORCHETE_A';
                            }
"]"                         { TablaTokens.agregarToken({tipo: "CORCHETE_C",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'CORCHETE_C';
                            }

/* ASIGNACIÓN */
"+="                        { TablaTokens.agregarToken({tipo: "ASIGNA_MAS",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'ASIGNA_MAS';
                            }
"-="                        { TablaTokens.agregarToken({tipo: "ASIGNA_MENOS",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'ASIGNA_MENOS';
                            }

/* PARA FOR */
"++"                        { TablaTokens.agregarToken({tipo: "INCREMENTO",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'INCREMENTO';
                            }
"--"                        { TablaTokens.agregarToken({tipo: "DECREMENTO",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'DECREMENTO';
                            }

/* ARITMÉTICA */
"/"                         { TablaTokens.agregarToken({tipo: "BARRA",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'BARRA';
                            }
"%"                         { TablaTokens.agregarToken({tipo: "MODULO",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'MODULO';
                            }
"*"                         { TablaTokens.agregarToken({tipo: "ASTERISCO",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'ASTERISCO';
                            }
"+"                         { TablaTokens.agregarToken({tipo: "MAS",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'MAS';
                            }

/* NEGACIÓN */
"-"                         { TablaTokens.agregarToken({tipo: "MENOS",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'MENOS';
                            }

/* IGUALDAD Y DESIGUALDAD */
"=="                        { TablaTokens.agregarToken({tipo: "IGUALDAD",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'IGUALDAD';
                            }
"!="                        { TablaTokens.agregarToken({tipo: "DESIGUALDAD",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'DESIGUALDAD';
                            }

/* RELACIONALES */
">="                        { TablaTokens.agregarToken({tipo: "MAYOR_IGUAL",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'MAYOR_IGUAL';
                            }
"<="                        { TablaTokens.agregarToken({tipo: "MENOR_IGUAL",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'MENOR_IGUAL';
                            }
">"                         { TablaTokens.agregarToken({tipo: "MAYOR",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'MAYOR';
                            }
"<"                         { TablaTokens.agregarToken({tipo: "MENOR",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'MENOR';
                            }

/* LÓGICOS */
"!"                         { TablaTokens.agregarToken({tipo: "NOT",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'NOT';
                            }
"&&"                        { TablaTokens.agregarToken({tipo: "AND",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'AND';
                            }
"||"                        { TablaTokens.agregarToken({tipo: "OR",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'OR';
                            }

/* SENTENCIAS */
"var"                       { TablaTokens.agregarToken({tipo: "VAR",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'VAR';
                            }
"if"                        { TablaTokens.agregarToken({tipo: "IF",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'IF';
                            }
"else"                      { TablaTokens.agregarToken({tipo: "ELSE",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'ELSE';
                            }
"switch"                    { TablaTokens.agregarToken({tipo: "SWITCH",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'SWITCH';
                            }
"case"                      { TablaTokens.agregarToken({tipo: "CASE",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'CASE';
                            }
"default"                   { TablaTokens.agregarToken({tipo: "DEFAULT",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'DEFAULT';
                            }
"fmt.Println"               { TablaTokens.agregarToken({tipo: "PRINT",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'PRINT';
                            }
"for"                       { TablaTokens.agregarToken({tipo: "FOR",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'FOR';
                            }
"range"                     { TablaTokens.agregarToken({tipo: "RANGE",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'RANGE';
                            }
"break"                     { TablaTokens.agregarToken({tipo: "BREAK",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'BREAK';
                            }
"continue"                  { TablaTokens.agregarToken({tipo: "CONTINUE",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'CONTINUE';
                            }
"return"                    { TablaTokens.agregarToken({tipo: "RETURN",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'RETURN';
                            }
"slices.Index"              { TablaTokens.agregarToken({tipo: "INDEX",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'INDEX';
                            }
"strings.Join"              { TablaTokens.agregarToken({tipo: "JOIN",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'JOIN';
                            }
"len"                       { TablaTokens.agregarToken({tipo: "LEN",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'LEN';
                            }
"append"                    { TablaTokens.agregarToken({tipo: "APPEND",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'APPEND';
                            }
"func"                      {   /*console.log("Función encontrada: " + yytext); */
                                TablaTokens.agregarToken({tipo: "FUNC",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'FUNC';
                            }
"strconv.Atoi"              { TablaTokens.agregarToken({tipo: "ATOI",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'ATOI';
                            }
"strconv.ParseFloat"        { TablaTokens.agregarToken({tipo: "PARSEFLOAT",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'PARSEFLOAT';
                            }
"reflect.TypeOf"            { TablaTokens.agregarToken({tipo: "TYPEOF",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'TYPEOF';
                            }

/* OTROS SÍMBOLOS */
"="                         { TablaTokens.agregarToken({tipo: "IGUAL",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'IGUAL';
                            }
"{"                         { TablaTokens.agregarToken({tipo: "LLAVE_A",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'LLAVE_A';
                            }
"}"                         { TablaTokens.agregarToken({tipo: "LLAVE_C",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'LLAVE_C';
                            }
":"                         { TablaTokens.agregarToken({tipo: "DOS_PUNTOS",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'DOS_PUNTOS';
                            }
":="                        { TablaTokens.agregarToken({tipo: "PUNTO_IGUAL",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'PUNTO_IGUAL';
                            }
","                         { TablaTokens.agregarToken({tipo: "COMA",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'COMA';
                            }
";"                         { TablaTokens.agregarToken({tipo: "PUNTO_COMA",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'PUNTO_COMA';
                            }
"."                         { TablaTokens.agregarToken({tipo: "PUNTO",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'PUNTO';
                            }

/* CADENA */
\"([^\"\\]|\\.)*\"          { TablaTokens.agregarToken({tipo: "CADENA",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'CADENA';
                            }


/* NÚMEROS */
[0-9]+"."[0-9]+           { TablaTokens.agregarToken({tipo: "NUMERO_DECIMAL",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'NUMERO_DECIMAL';
                            }
[0-9]+                    { TablaTokens.agregarToken({tipo: "NUMERO",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'NUMERO';
                            }

/* SECUENCIAS DE ESCAPE */
"\""                        { TablaTokens.agregarToken({tipo: "COMILLA_DOBLE",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'COMILLA_DOBLE';
                            }
"\\"                        { TablaTokens.agregarToken({tipo: "BARRA_INVERTIDA",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'BARRA_INVERTIDA';
                            }
"\n"                        { TablaTokens.agregarToken({tipo: "SALTO_LINEA",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'SALTO_LINEA';
                            }
"\r"                        { TablaTokens.agregarToken({tipo: "RETORNO_CARRO",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'RETORNO_CARRO';
                            }
"\t"                        { TablaTokens.agregarToken({tipo: "TABULACION",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'TABULACION';
                            }

/* ID */
[a-zA-Z_][a-zA-Z0-9_]*      { TablaTokens.agregarToken({tipo: "ID",lexema: yytext,fila: yylineno,columna: yylloc.first_column});
                                return 'ID';
                            }

/* FIN DE DOCUMENTO */
<<EOF>>                     {   
                                TablaTokens.crearReporteTokens();
                                TablaErrores.crearReporteErrores();
                                return 'EOF';
                            }

/* ERRORES */
.                           {   TablaErrores.agregarError({tipo: "Lexico", descripcion: "Carácter inválido: " + yytext, fila: yylineno, columna: yylloc.first_column});
                                return 'INVALID';
                            }

/lex
%locations 
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
